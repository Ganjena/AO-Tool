const User = require(`../models/userSchema.js`);

async function isVerified (req, res, next) {
    const user  = await User.findOne({username: req.body.username});
    if (!user.isVerified){
        req.flash(`error`, `Please check your emails to verify your account. `)
        return res.redirect(`/`);
    } else {
        next();
    }
}

module.exports = {
    isVerified
}