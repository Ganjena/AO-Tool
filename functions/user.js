const User = require(`../models/userSchema.js`);

async function isVerified (req, res, next) {
    const user  = await User.findOne({username: req.body.username});
    if (!user.isVerified){
        req.flash(`error`, "Please check your emails to verify your account. <a href=\"resend-token?user="+req.body.username+"\">Click here to resend verification email</a>")
        return res.redirect(`/`);
    } else {
        next();
    }
}

async function isAdmin (req, res, next){
    const user = res.locals.isAdmin;
    if (user === false){
        req.flash(`error`, `You are not an admin.`);
        return res.redirect(`/home`);
    } else {
        next();
    }

}

module.exports = {
    isVerified,
    isAdmin
}