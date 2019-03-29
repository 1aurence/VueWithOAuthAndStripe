var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const keys = require("../config/keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.googleCallback,
      // proxy: true,
      passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
      let existingUser = await User.query().where("google_id", profile.id);
      if (existingUser.length === 0) {
        let newUser = await User.query().insert({ google_id: profile.id });
        done(null, newUser);
      } else {
        done(null, existingUser);
      }
    }
  )
);
