const { model } = require("mongoose");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = model("user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new Strategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload }, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }),
);
