const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	build: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `buildSchema`
	},
	enemy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `enemySchema`
	}
});

const User = mongoose.model(`User`, userSchema);


module.exports = User;

