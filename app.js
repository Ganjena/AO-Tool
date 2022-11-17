const express = require("express");
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


mongoose.connect("mongodb://localhost:27017/AO_TOOL");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

async function status(req, res, next){
	// finds model in db
	const stats = await Build.findOne(); 
	//makes some calculation and updates the model
	stats.miscStat.totalNW = calcNw(stats); 
	stats.miscStat.power = calcPower(stats); 
	await stats.save(); 
	//passes miscStat to route for ejs to work with
	req.stats = stats.miscStat;
	// trigger next middleware
	next();   
	
}

app.use(status);

// call all routes from routes.ejs file.
app.use(`/`, routes);

// error handler middleware
app.use((err, req, res, next) =>{
	const stats = req.stats;
	const { statusCode = 500 } = err;
	if (!err.message) err.message = `Oh No, Something Went Wrong!`;
	res.status(statusCode).render(`../utilities/error.ejs`, { stats, err});
});

app.listen(3000, () => {
	console.log("Listening on port 3000!");
	console.log("Server Started.....");
});