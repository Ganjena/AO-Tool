if (process.env.NODE_ENV !== `production`){
	require(`dotenv`).config();
}

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require(`helmet`);
// sanitize all query string in req.body, req.params etc to prevent sql injection
const mongoSanitize = require('express-mongo-sanitize');
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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//body parser - ability to parse form data.
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.DB_ADDRESS);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// add sessions to express
const sessionConfig = {
	name: `ao.session`,
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// add secure at later date once deployed
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));
app.use(flash());
app.use(mongoSanitize());
app.use(helmet());

//helmet config
const scriptSrcUrls = [
	"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
];
const styleSrcUrls = [
	"https://cdn.jsdelivr.net"
];
const connectSrcUrls = [];
const fontSrcUrls = [
	"https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2",
	"https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2"
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

app.listen(3000, () => {
	console.log("Listening on port 3000!");
	console.log("Server Started.....");
});