/* const { Router } = require("express");
const router = Router();
const passport = require("passport");
const config = require("config");
const FacebookStrategy = require("passport-facebook").Strategy;
const VKontakteStrategy = require("passport-vkontakte").Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.use(passport.initialize());

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("OAuth.facebookAuth.clientID"),
      clientSecret: config.get("OAuth.facebookAuth.clientSecret"),
      callbackURL: config.get("OAuth.facebookAuth.callbackURL"),
    },
    async (accessToken, refreshToken, profile, cb) => {
      await User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new VKontakteStrategy(
    {
      clientID: config.get("OAuth.vkAuth.clientID"),
      clientSecret: config.get("OAuth.vkAuth.clientSecret"),
      callbackURL: config.get("OAuth.vkAuth.callbackURL"),
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

router.use("/auth", require("./vkAuth"));
router.use("/auth", require("./facebookAuth"));

module.exports = { router, passport }; */
