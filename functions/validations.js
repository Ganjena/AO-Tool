
const ExpressError = require(`../utilities/ExpressError.js`); 
const enemySchema = require(`../utilities/joiSchema.js`);
const buildingSchema = require(`../utilities/joiSchema.js`);
const seaUnitSchema = require(`../utilities/joiSchema.js`);
const airUnitSchema = require(`../utilities/joiSchema.js`);
const vehUnitSchema = require(`../utilities/joiSchema.js`);
const infUnitSchema = require(`../utilities/joiSchema.js`);
const missileSchema = require(`../utilities/joiSchema.js`);
const landSchema = require(`../utilities/joiSchema.js`);

//validates data in the request before updating the database
module.exports.validateEnemySchema = (req, res, next) =>{
	const {error} = enemySchema.validate(req.body);
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

module.exports.validateBuildingSchema = (req, res, next) =>{
	const {error} = buildingSchema.validate(req.body);
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

module.exports.validateSeaUnitsSchema = (req, res, next) =>{
	const {error} = seaUnitSchema.validate(req.body);
	console.log(req.body)
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

module.exports.validateAirUnitsSchema = (req, res, next) =>{
	const {error} = airUnitSchema.validate(req.body);
	console.log(req.body)
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

module.exports.validateVehUnitsSchema = (req, res, next) =>{
	const {error} = vehUnitSchema.validate(req.body);
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

module.exports.validateInfUnitsSchema = (req, res, next) =>{
	const {error} = infUnitSchema.validate(req.body);
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

module.exports.validateMissileSchema = (req, res, next) =>{
	const {error} = missileSchema.validate(req.body);
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

module.exports.validateLandSchema = (req, res, next) =>{
	const {error} = landSchema.validate(req.body);
	if (error){
		const msg = error.details.map(el => el.message).join(``)
		throw new ExpressError(msg, 400)
	}else {
		next();
	}
}

// module.exports = validateEnemySchema;
// module.exports = validateBuildingSchema;
// module.exports = validateSeaUnitsSchema;
// module.exports = validateairUnitsSchema;
// module.exports = validateVehUnitsSchema;
// module.exports = validateInfUnitsSchema;
// module.exports = validateMissileSchema;
// module.exports = validateLandSchema;
