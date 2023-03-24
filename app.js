if (process.env.NODE_ENV !== `production`){
	require(`dotenv`).config();
}

const express = require("express");
const session = require("express-session");
//use to store cookies mongo side rather then in memory
const MongoStore = require(`connect-mongo`);
// needed to make flash messages
const flash = require("connect-flash");
// SAFTEY - Stops unwanted scripts running on website
const helmet = require(`helmet`);
// sanitize all query string in req.body, req.params etc to prevent sql injection
const mongoSanitize = require('express-mongo-sanitize');
//LOGIN and authentication
const passport = require(`passport`);
const LocalStrategy = require(`passport-local`);
const User = require(`./models/userSchema.js`);
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Build = require(`./models/buildSchema.js`);
const { calcNw, calcPower} = require(`./functions/userCalcs.js`);
const routes = require(`./routes/routes.js`);
const app = express();
//Development and Production address and details.
const dbUrl = process.env.PROD_DB_ADDRESS || process.env.DEV_DB_ADDRESS 
const port = process.env.PORT || 3000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "scss")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
//body parser - ability to parse form data.
app.use(express.urlencoded({ extended: true }));


mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// config connect-mongo to store sessions on database instead of memory
app.use(session({
	name: `ao.session`,
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false, // don't create session until something stored
	resave: false, //don't save session if unmodified
	store: MongoStore.create({
		mongoUrl: dbUrl,
		// touchAfter: 12 * 3600, // time period in seconds
		autoRemove: `interval`,
		autoRemoveInterval: 60 // In minutes
	}),
	cookie: {
		maxAge: 3600000, // 1hour
		httpOnly: true
	}
	}));

// // add sessions to express
// const sessionConfig = {
// 	name: `ao.session`,
// 	secret: process.env.SESSION_SECRET,
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		httpOnly: true,
// 		// add secure at later date once deployed
// 		// secure: true,
// 		maxAge: 600000,
// 	},
// };
// app.use(session(sessionConfig));
app.use(flash()); 
app.use(mongoSanitize());
app.use(helmet());

//configer bootstrap
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//helmet config
const scriptSrcUrls = [
	"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
];
const styleSrcUrls = [
	"https://cdn.jsdelivr.net",
	"https://fonts.googleapis.com/css?family=Lato"
];
const connectSrcUrls = [];
const fontSrcUrls = [
	"https://fonts.gstatic.com"
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function status(req, res, next){
	if(!req.user){
		//add flash messages to each route
		res.locals.success = req.flash(`success`);
		res.locals.error = req.flash(`error`);
		next();
	}else{
	// finds model in db
	const stats = await Build.findById(req.user.build._id);
	//makes some calculation and updates the model
	stats.miscStat.totalNW = calcNw(stats); 
	stats.miscStat.power = calcPower(stats); 
	await stats.save(); 
	//passes miscStat to all routes and boilerplate for ejs to work with
	res.locals.totalNW = stats.miscStat.totalNW;
	res.locals.land = stats.miscStat.land;
	res.locals.power = stats.miscStat.power;
	res.locals.isAdmin = req.user.isAdmin;
	//add flash messages to each route
	res.locals.success = req.flash(`success`);
	res.locals.error = req.flash(`error`);
	// trigger next middleware
	next();   
	}
}

app.use(status);

// call all routes from routes.ejs file.
app.use(`/`, routes);

// error handler middleware
app.use((err, req, res, next) =>{
	const { statusCode = 500 } = err;
	if (!err.message) err.message = `Oh No, Something Went Wrong!`;
	res.status(statusCode).render(`../utilities/error.ejs`, {err});
});

app.listen(port, () => {
	if(port === 3000){
		console.log(`Connected to development server...`)
		console.log(`Port: ${port}...`);
		console.log("Server Started.....");
	}else {
		console.log(`Connected to production server...`)
		console.log(`Port: ${port}...`);
		console.log("Server Started.....");
	}
});