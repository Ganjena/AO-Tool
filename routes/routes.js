const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);

const User = require(`../models/user.js`);
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
} = require(`../functions/validations.js`);

const catchAsync = require(`../utilities/catchAsync.js`);
const ExpressError = require(`../utilities/ExpressError.js`);


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

router.post(`/register`, catchAsync( async (req, res) =>{
	try{
		const {username, password} = req.body;
		const user = new User({username});
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, err =>{
			if(err) return next (err)
			req.flash(`success`, `Welcome to AoTool!`);
			res.redirect(`/home`);
		});
	} catch(e){
		req.flash(`error`, e.message);
		res.redirect(`/`);
	}
}));

router.post(`/login`, passport.authenticate(`local`, {failureFlash: true, failureRedirect: `/`}), catchAsync( async (req, res) =>{
	req.flash(`success`, `Welcome back ${req.user.username}`);
	res.redirect(`/home`);
}));

router.get("/home", isLoggedIn, (req, res) => {
	res.render("home");
});

router.get(`/enemy`, isLoggedIn, catchAsync( async (req, res) => {
	// update enemy land equations and add them to database
	calcEnemyLand();
	//update enemy power equations and add them to database
	calcEnemyPower();
	const {units, buildings, land, ppeActive} = await Enemy.findOne();
	res.render(`enemy`, {units, buildings, land, ppeActive});
})
);

router.post(`/enemy`, isLoggedIn, validateEnemySchema, catchAsync( async (req, res) =>{
	// take enemy input from user and add it to the database
	updateEnemy(req.body);
	// update enemy land equations and add them to database
	calcEnemyLand();
	//update enemy power equations and add them to database
	calcEnemyPower();
	//update enemy attack/defence equations for the attack page
	calcEnemyDef();
	res.redirect(`/enemy`)
})
);

router.get("/attack", isLoggedIn, catchAsync( async(req, res) => {
	const {attackStats} = await Enemy.findOne({});
	const build = await Build.findOne({});
	//update and check all attack powers
	res.render("attackCalc", {attackStats, build});
})
);

router.get("/power", isLoggedIn, catchAsync( async (req, res) => {
	const enemySetup = await Enemy.findOne({});
	res.render("powerCalc", {enemySetup});
})
);

router.get("/stats", isLoggedIn, (req, res) => {
	res.render("stats");
});

router.get("/research", isLoggedIn, catchAsync( async (req, res) => {
	const {research } = await Build.findOne();
		res.render("build/research", {research});
	})
);

router.post(`/research`, isLoggedIn, catchAsync( async (req, res) => {
	const updateDb = await Build.findOne();
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
	const updateDb = await Build.findOne();
	updateDb.miscStat.land = req.body.land;
	await updateDb.save();
	res.redirect(`/land`);
}));

router.get("/buildings", isLoggedIn, catchAsync( async (req, res) => {
	const {buildings} = await Build.findOne();
	res.render("build/buildings", {buildings});
	})
);

router.post(`/buildings`, isLoggedIn, validateBuildingSchema, catchAsync( async (req, res) =>{
	updateBldMisDb(req.body, `buildings`);
	res.redirect(`/buildings`);
})
);

router.get("/sea_units", isLoggedIn, catchAsync( async (req, res) => {
		const {units} = await Build.findOne();
		const seaUnits = units.seaUnits;
			//update attack power stats
	calcAttackPower();
	// updates win/lose outcomes
	calcWinLoss();
		res.render("build/seaUnits", {seaUnits});
	})
);

router.post(`/sea_units`, isLoggedIn, validateSeaUnitsSchema, catchAsync( async (req, res) =>{
	updateUnitsDb(req.body, `units`, `seaUnits`);
	res.redirect(`/sea_units`);
}));

router.get("/air_units", isLoggedIn, catchAsync( async (req, res) => {
	const { units } = await Build.findOne();
	const airUnits = units.airUnits;
		//update attack power stats
		calcAttackPower();
		// updates win/lose outcomes
		calcWinLoss();
		res.render("build/airUnits", {airUnits});
	})
);

router.post(`/air_units`, isLoggedIn, validateAirUnitsSchema, catchAsync( async (req, res) =>{
	updateUnitsDb(req.body, `units`, `airUnits`);
	res.redirect(`/air_units`);
}));

router.get("/vehicle_units", isLoggedIn, catchAsync( async (req, res) => {
	const { units } = await Build.findOne();
	const vehUnits = units.vehUnits;
		//update attack power stats
		calcAttackPower();
		// updates win/lose outcomes
		calcWinLoss();
		res.render("build/vehicleUnits", {vehUnits});
	})
);

router.post(`/vehicle_units`, isLoggedIn, validateVehUnitsSchema, catchAsync( async (req, res) =>{
	updateUnitsDb(req.body, `units`, `vehUnits`);

	res.redirect(`/vehicle_units`);
}));

router.get("/infantry_units", isLoggedIn, catchAsync( async (req, res) => {
		const { units } = await Build.findOne();
		const infUnits = units.infUnits;
		//update attack power stats
		calcAttackPower();
		// updates win/lose outcomes
		calcWinLoss();
		res.render("build/infantryUnits", {infUnits});
	})
);

router.post(`/infantry_units`, isLoggedIn, validateInfUnitsSchema, catchAsync( async (req, res) =>{
	updateUnitsDb(req.body, `units`, `infUnits`);

	res.redirect(`/infantry_units`);
}));

router.get("/missiles", isLoggedIn, catchAsync( async (req, res) => {
		const { missiles } = await Build.findOne();	
		res.render("build/missiles", {missiles});
	})
);

router.post(`/missiles`, isLoggedIn, validateMissileSchema, catchAsync( async (req, res) =>{
	updateBldMisDb(req.body, `missiles`);
	res.redirect(`/missiles`);
}));

router.get("/satellite", isLoggedIn, catchAsync( async (req, res) => {
	const {satellite} = await Build.findOne();
		res.render("build/sats", {satellite});
	})
);

router.post(`/satellite`, isLoggedIn, catchAsync( async (req, res) =>{
	const updateSat = await Build.findOne();
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
	await Build.deleteMany({});
	await Enemy.deleteMany({});
	const build = new Build();
	const enemy = new Enemy();
	await build.save();
	await enemy.save();
	res.redirect(`/home`);
}));

router.get(`/logout`, catchAsync( async (req, res) =>{
	req.logout(function(err) {
		if (err) { return next(err); }
		req.flash('success', "You have been logged out.");
		res.redirect('/');
	  });
}));

// catch all route
router.all(`*`, (req, res, next) =>{
	next(new ExpressError(`Page Not Found`, 404));
})


module.exports = router;