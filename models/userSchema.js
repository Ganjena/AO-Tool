const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    build: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `Build`,
	},
	enemy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `Enemy`,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model(`User`, UserSchema);