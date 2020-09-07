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
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("profile", profile);
        console.log("refreshToken", refreshToken);
        console.log("accessToken", accessToken);
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        // await User.findOrCreate({ facebookId: profile.id }, function (
        //   err,
        //   user
        // ) {});
        if (existingUser) return done(null, existingUser);
        const newUser = new User({
          method: "facebook",
          google: { id: profile.id, email: profile.emails[0].value },
        });

        await newUser.save();
        done(null, newUser);
      } catch (e) {
        return done(e, false, e.message);
      }
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

module.exports = { router, passport };
 */
