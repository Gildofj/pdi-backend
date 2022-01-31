const { model } = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = model("user");

//Called during login/sign up.
passport.use(new LocalStrategy(User.authenticate()));

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser());
