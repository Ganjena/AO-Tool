//weird function thing needed for experss to catch error in async functions

module.exports = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch(next);
	};
};
 