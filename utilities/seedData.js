const mongoose = require("mongoose");
const Build = require(`../models/buildSchema.js`);
const Enemy = require(`../models/enemySchema.js`);
const User = require(`../models/userSchema.js`);



mongoose.connect("mongodb://localhost:27017/AO_TOOL");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});



async function run(){
// removes all data from DB
await Build.deleteMany({});
await Enemy.deleteMany({});
await User.deleteMany({});
}

run();

mongoose.connection.close;