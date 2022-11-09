const mongoose = require("mongoose");
const Build = require(`../models/buildSchema.js`);
const Enemy = require(`../models/enemySchema.js`);



mongoose.connect("mongodb://localhost:27017/AO_TOOL");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});



async function run(){
// Sseed basic setup datas
await Build.deleteMany({});
await Enemy.deleteMany({});
const build = new Build();
const enemy = new Enemy();
await build.save();
await enemy.save();

}

run();

mongoose.connection.close;