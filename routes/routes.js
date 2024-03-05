const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
const sgMail = require('@sendgrid/mail');
const crypto = require(`crypto`);

const User = require(`../models/userSchema.js`);
const Build = require(`../models/buildSchema.js`);
const Enemy = require(`../models/enemySchema.js`);

const { 
	validateEnemySchema,
	validateLandSchema,
	validateBuildingSchema,
	validateSeaUnitsSchema,
	validateAirUnitsSchema,
	validateVehUnitsSchema,
	validateInfUnitsSchema,
	validateMissileSchema,
	validateUserSchema
} = require(`../functions/validations.js`);

const {
	isVerified,
	isAdmin
} = require(`../functions/user.js`);

// testing new winloss calc
const {
    defenderUnitTypes,
    attackerUnitTypes,
    defenderUnitTargets,
    attackerUnitTargets,
	APCalc
} = require(`../functions/winlossCalc.js`);

const catchAsync = require(`../utilities/catchAsync.js`);
const ExpressError = require(`../utilities/ExpressError.js`);
// SEND GRID email setup to verify users email address.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const {
	updateUnitsDb,
    updateBldMisDb,
    calcAttackPower,
    calcWinLoss
	} = require(`../functions/userCalcs.js`);

const {
	calcEnemyPower,
    updateEnemy,
    calcEnemyLand,
    calcEnemyDef
	} = require(`../functions/enemyCalcs.js`);

	// passport middleware checks if current user is logged in
const isLoggedIn = (req, res, next) =>{
	if(!req.isAuthenticated()){
		req.flash(`error`, `You must be signed in to view this page!`);
		return res.redirect(`/`);
	}
	next()
}

router.get("/", catchAsync( async (req, res) => {
	res.render("index");
})
);

router.post(`/register`, validateUserSchema, catchAsync( async (req, res) =>{
		const {username, password, email} = req.body;
		const build = new Build();
		const enemy = new Enemy();
		const user = new User({
			build: build,
			enemy: enemy,
			username: username, 
			email: email,
			emailToken: crypto.randomBytes(64).toString(`hex`),
			isVerified: false
		});
		// user.build = build;
		// user.enemy = enemy;
		await build.save();
		await enemy.save();
		// const registeredUser = await User.register(user, password);
		User.register(user, password, catchAsync( async (err,user) =>{
			if(err){
				req.flash(`error`, err.message);
				return res.redirect(`/`);
			}
			const msg = {
				to: user.email,
				from: 'marc_rothmann@hotmail.co.uk', // Use the email address or domain you verified above
				subject: 'AO Tool - Please verify your email address.',
				text: `
					Please copy and paste the link below to verify your account.
					http://${req.headers.host}/verify-email?token=${user.emailToken}
				`,
				html: `
				<h1> AO Tool</h1>
				<p>Please click the link below to verify your acccount.</p>
				<a href="http://${req.headers.host}/verify-email?token=${user.emailToken}">Verify your account.</a>
				`,
			  };
			  try {
				await sgMail.send(msg);
				req.flash(`success`, `Thanks for registering. Please check your email to veify your account.`)
				res.redirect(`/`);
			  } catch (err){
				req.flash(`error`, `Sorry, something went wrong! Please contact admin.`)
				res.redirect(`/`)
			  }
		}));
}));

// resend verify email if didnt receive.
router.get(`/resend-token`, catchAsync( async (req, res) =>{
	const user = await User.findOne({username: req.query.user});
	if (!user){
		req.flash(`error`, `Not Valid User!`);
		return res.redirect(`/`);
	}
	const msg = {
		to: user.email,
		from: 'marc_rothmann@hotmail.co.uk', // Use the email address or domain you verified above
		subject: 'AO Tool - Please verify your email address.',
		text: `
			Please copy and paste the link below to verify your account.
			http://${req.headers.host}/verify-email?token=${user.emailToken}
		`,
		html: `
		<h1> AO Tool</h1>
		<p>Please click the link below to verify your acccount.</p>
		<a href="http://${req.headers.host}/verify-email?token=${user.emailToken}">Verify your account.</a>
		`,
	  };
	  try {
		await sgMail.send(msg);
		req.flash(`success`, `Thanks for registering. Please check your email to veify your account.`)
		res.redirect(`/`);
	  } catch (err){
		req.flash(`error`, `Sorry, something went wrong! Please contact admin.`)
		res.redirect(`/`)
	  }

}));

//Email verification route
router.get(`/verify-email`, catchAsync( async (req, res) => {
	try {
		const user = await User.findOne({ emailToken: req.query.token});
		if (!user){
			req.flash(`error`, `Token is invalid. Please contact admin`);
			return res.redirect(`/`);
		}
		user.emailToken = null;
		user.isVerified = true;
		await user.save();
		await req.login(user, async (err) => {
			if (err) return next (err);
			req.flash(`success`, `Welcome back ${user.username}`);
			res.redirect(`/home`)
		})
	} catch (err){
		req.flash(`error`, `Sorry, something went wrong! Please contact admin.`)
		res.redirect(`/`)
	  }
}));



router.post(`/login`,  passport.authenticate(`local`, {failureFlash: true, failureRedirect: `/`}), isVerified, catchAsync( async (req, res) =>{
	console.log
	req.flash(`success`, `Welcome back ${req.user.username}`);
	res.redirect(`/home`);
}));

router.get("/home", isLoggedIn, (req, res) => {
	res.render("home");
});

router.get(`/enemy`, isLoggedIn, catchAsync( async (req, res) => {
	const enemyId = req.user.enemy._id;
	await calcEnemyLand(enemyId);
	await calcEnemyPower(enemyId);
	const {units, buildings, land, ppeActive, name, networth}  = await Enemy.findById(enemyId);
	//toLocalString() formats the number with comma's.
	enemyLand = land.toLocaleString();
	enemyNetworth = networth.toLocaleString();
	res.render(`enemy`, {units, buildings, ppeActive, enemyLand, name, enemyNetworth});
})
);

router.post(`/enemy`, isLoggedIn, catchAsync( async (req, res) =>{
	const user = req.user;
	// console.log(user)
	const enemyId = req.user.enemy._id;
	// console.log(req.user)
	// console.log("outside" + enemyId)
	const userInput = req.body.report;
	// take enemy input from user and add it to the database
	await updateEnemy(user, userInput);
	// update enemy land equations and add them to database
	//await calcEnemyLand(enemyId);
	// //update enemy power equations and add them to database
	// await calcEnemyPower(enemyId);
	// //update enemy attack/defence equations for the attack page
	// await calcEnemyDef(enemyId);
	res.redirect(`/enemy`)
})
);

router.get("/attack", isLoggedIn, catchAsync( async(req, res) => {
	const attacker = req.user.build._id;
	const defender = req.user.enemy._id;
	await calcEnemyDef(req.user.enemy._id);
	const {attackStats} = await Enemy.findById(defender);
	const build = await Build.findById(attacker);
	const winLoss = await APCalc(attacker, defender);
	//console.log(attackStats)
	//console.log(winLoss)
	res.render("attackCalc", {attackStats, build, winLoss});
})
);

router.get("/power", isLoggedIn, catchAsync( async (req, res) => {
	const enemySetup = await Enemy.findById(req.user.enemy._id);
	res.render("powerCalc", {enemySetup});
})
);

router.get("/stats", isLoggedIn, (req, res) => {
	res.render("stats");
});

router.get("/research", isLoggedIn, catchAsync( async (req, res) => {
	const {research } = await Build.findById(req.user.build._id);
		res.render("build/research", {research});
	})
);

router.post(`/research`, isLoggedIn, catchAsync( async (req, res) => {
	const updateDb = await Build.findById(req.user.build._id);
	for (let key of Object.keys(req.body)){
		if(key === `add`){
			updateDb.research[req.body.add].level += 1;
		}else if (key === `remove`) {
			updateDb.research[req.body.remove].level -= 1;
		}
	}
	await updateDb.save();
	res.redirect(`/research`);
}));

router.get("/land", isLoggedIn, catchAsync( async (req, res) => {
		res.render("build/land");
	})
);

router.post(`/land`, isLoggedIn, validateLandSchema, catchAsync( async (req, res) => {
	const updateDb = await Build.findById(req.user.build._id);
	updateDb.miscStat.land = req.body.land;
	await updateDb.save();
	res.redirect(`/land`);
}));

router.get("/buildings", isLoggedIn, catchAsync( async (req, res) => {
	const {buildings} = await Build.findById(req.user.build._id);
	res.render("build/buildings", {buildings});
	})
);

router.post(`/buildings`, isLoggedIn, validateBuildingSchema, catchAsync( async (req, res) =>{
	updateBldMisDb(req.body, `buildings`, req.user.build._id);
	res.redirect(`/buildings`);
})
);

router.get("/sea_units", isLoggedIn, catchAsync( async (req, res) => {
		const {units} = await Build.findById(req.user.build._id);
		const seaUnits = units.seaUnits;
			//update attack power stats
	//calcAttackPower(req.user.build._id);
	// updates win/lose outcomes
	//calcWinLoss(req.user.build._id, req.user.enemy._id);
		res.render("build/seaUnits", {seaUnits});
	})
);

router.post(`/sea_units`, isLoggedIn, validateSeaUnitsSchema, catchAsync( async (req, res) =>{
	await updateUnitsDb(req.body, `units`, `seaUnits`, req.user.build._id);
	await calcAttackPower(req.user.build._id);
	res.redirect(`/sea_units`);
}));

router.get("/air_units", isLoggedIn, catchAsync( async (req, res) => {
	const { units } = await Build.findById(req.user.build._id);
	const airUnits = units.airUnits;
		//update attack power stats
		//calcAttackPower(req.user.build._id);
		// updates win/lose outcomes
		//calcWinLoss(req.user.build._id, req.user.enemy._id);
		res.render("build/airUnits", {airUnits});
	})
);

router.post(`/air_units`, isLoggedIn, validateAirUnitsSchema, catchAsync( async (req, res) =>{
	await updateUnitsDb(req.body, `units`, `airUnits`, req.user.build._id);
	await calcAttackPower(req.user.build._id);
	res.redirect(`/air_units`);
}));

router.get("/vehicle_units", isLoggedIn, catchAsync( async (req, res) => {
	const { units } = await Build.findById(req.user.build._id);
	const vehUnits = units.vehUnits;
		//update attack power stats
		//calcAttackPower(req.user.build._id);
		// updates win/lose outcomes
		//calcWinLoss(req.user.build._id, req.user.enemy._id);
		res.render("build/vehicleUnits", {vehUnits});
	})
);

router.post(`/vehicle_units`, isLoggedIn, validateVehUnitsSchema, catchAsync( async (req, res) =>{
	await updateUnitsDb(req.body, `units`, `vehUnits`, req.user.build._id);
	await calcAttackPower(req.user.build._id);
	res.redirect(`/vehicle_units`);
}));

router.get("/infantry_units", isLoggedIn, catchAsync( async (req, res) => {
		const { units } = await Build.findById(req.user.build._id);
		const infUnits = units.infUnits;
		//update attack power stats
		//calcAttackPower(req.user.build._id);
		// updates win/lose outcomes
		//calcWinLoss(req.user.build._id, req.user.enemy._id);
		res.render("build/infantryUnits", {infUnits});
	})
);

router.post(`/infantry_units`, isLoggedIn, validateInfUnitsSchema, catchAsync( async (req, res) =>{
	await updateUnitsDb(req.body, `units`, `infUnits`, req.user.build._id);
	await calcAttackPower(req.user.build._id);
	res.redirect(`/infantry_units`);
}));

router.get("/missiles", isLoggedIn, catchAsync( async (req, res) => {
		const { missiles } = await Build.findById(req.user.build._id);	
		res.render("build/missiles", {missiles});
	})
);

router.post(`/missiles`, isLoggedIn, validateMissileSchema, catchAsync( async (req, res) =>{
	updateBldMisDb(req.body, `missiles`, req.user.build._id);
	res.redirect(`/missiles`);
}));

router.get("/satellite", isLoggedIn, catchAsync( async (req, res) => {
	const {satellite} = await Build.findById(req.user.build._id);
		res.render("build/sats", {satellite});
	})
);

router.post(`/satellite`, isLoggedIn, catchAsync( async (req, res) =>{
	const updateSat = await Build.findById(req.user.build._id);
	for (let key of Object.keys(updateSat.satellite)){
		updateSat.satellite[key].amount = 0;
		if (req.body.selected === key){
			updateSat.satellite[key].amount = 1;
		};
	};
	await updateSat.save();
	res.redirect(`/satellite`);
}));

router.get(`/reset`, isLoggedIn, (req, res) =>{
	res.render(`build/reset`);
})

router.post(`/reset`, isLoggedIn, catchAsync( async (req, res) =>{
	await Build.findByIdAndRemove(req.user.build._id);
	await Enemy.findByIdAndRemove(req.user.enemy._id);
	const user = await User.findById(req.user._id);
	const build = new Build();
	const enemy = new Enemy();
	user.build = build;
	user.enemy = enemy;
	await build.save();
	await enemy.save();
	await user.save();
	res.redirect(`/home`);
}));

router.get(`/reset-password`, isLoggedIn, catchAsync( async (req, res ) =>{
	res.render(`resetPassword`);
}));

router.post(`/reset-password`, isLoggedIn, catchAsync( async (req, res ) =>{
	const { oldPassword, newPassword, repeatPassword } = req.body;
	if(newPassword === repeatPassword){
		await req.user.changePassword(oldPassword, newPassword);
		req.flash(`success`, `Password Changed`);
		return res.redirect(`/home`);
	}
	req.flash(`error`, `New passwords do not match.`);
	res.redirect(`/reset-password`);
}));

// lost password form - user enters email
router.get(`/lost-password`, catchAsync( async (req, res) =>{
	res.render(`lostPassword`);

}));

// if email matches DB, link to reset is set to user email
router.post(`/lost-password`, catchAsync( async (req, res) =>{
	const user = await User.findOne({email: req.body.email});
	if (!user){
		req.flash(`success`, `If a valid email was used, you will receive a reset link soon.`);
		console.log(`no email found`);
		return res.redirect(`/`);
		
	}
	user.emailToken = crypto.randomBytes(64).toString(`hex`);
	await user.save();
	const msg = {
		to: user.email,
		from: 'marc_rothmann@hotmail.co.uk', // Use the email address or domain you verified above
		subject: 'AO Tool - Reset password link',
		text: `
			Please copy and paste the link below to change your password.
			http://${req.headers.host}/changePassword?token=${user.emailToken}
		`,
		html: `
		<h1> AO Tool</h1>
		<p>Please click the link below to change your password.</p>
		<a href="http://${req.headers.host}/changePassword?token=${user.emailToken}">Change your password.</a>
		`,
	  };
	  try {
		await sgMail.send(msg);
		console.log(`email sent`)
		req.flash(`success`, `If a valid email was used, you will receive a reset link soon.`)
		res.redirect(`/`);
	  } catch (err){
		console.log(`there was an error`)
		req.flash(`success`, `If a valid email was used, you will receive a reset link soon.`)
		res.redirect(`/`)
	  }
}));

router.get(`/changePassword`, catchAsync( async (req, res) =>{
		const emailToken = req.query.token;
		const user = await User.findOne({ emailToken: emailToken});
		if (!user){
			req.flash(`error`, `Token is invalid. Please contact admin`);
			return res.redirect(`/`);
		}
		res.render(`changePassword`, { emailToken });
}));

router.post(`/changePassword`, catchAsync(async (req, res)=>{
	// change password logic, user.setPassword().
	const user = await User.findOne({ emailToken: req.query.token})
	const { newPassword, repeatPassword } = req.body; 
	if (newPassword !== repeatPassword){
		req.flash(`error`, `Passwords does not match.`)
		return res.redirect(`/changePassword?token=${req.query.token}`);
	}
	await user.setPassword(newPassword);
	user.emailToken = null;
	await user.save();
	req.flash(`success`, `Password successfully changed!`)
	return res.redirect(`/`);
}));

router.get(`/delete`, isLoggedIn, (req, res) =>{
	res.render(`build/delete`);
})

router.post(`/delete`, isLoggedIn, catchAsync( async (req, res) =>{
	await Build.findByIdAndRemove(req.user.build._id);
	await Enemy.findByIdAndRemove(req.user.enemy._id);
	await User.findByIdAndRemove(req.user._id);
	req.logout(function(err) {
		if (err) { return next(err); }
		req.flash('success', "Your Account and all data has been removed!");
		res.redirect('/');
	  });
}));

router.get(`/logout`, isLoggedIn, catchAsync( async (req, res) =>{
	req.logout(function(err) {
		if (err) { return next(err); }
		req.flash('success', "You have been logged out.");
		res.redirect('/');
	  });
}));

router.get(`/account`, isLoggedIn, catchAsync( async (req, res) =>{
	res.render(`account`);
}));

router.get(`/admin`, isLoggedIn, isAdmin, catchAsync( async (req, res) =>{
	const users = await User.find({});
	res.render(`admin`, {users});
}));

router.post(`/admin`, isLoggedIn, isAdmin, catchAsync( async (req, res) =>{
	// add admin control logic here
	console.log(req.body)
	if (req.body.action === "updateDB"){
		const allUsers = await User.find({});
		for (let i = 0; i < allUsers.length; i++ ){
			const user = allUsers[i];
			const build = new Build();
			const enemy = new Enemy();
			user.build = build;
			user.enemy = enemy;
			await build.save();
			await enemy.save();
			await user.save();
		}
	}
	res.redirect(`/admin`);
}))

// catch all route
router.all(`*`, (req, res, next) =>{
	next(new ExpressError(`Page Not Found`, 404));
})


module.exports = router;