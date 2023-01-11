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
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model(`User`, UserSchema);