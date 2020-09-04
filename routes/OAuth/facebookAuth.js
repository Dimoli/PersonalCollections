/* const { Router } = require("express");
const router = Router();
const config = require("config");
const FacebookStrategy = require("passport-facebook").Strategy;


passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("OAuth.facebookAuth.clientID"),
      clientSecret: config.get("OAuth.facebookAuth.clientSecret"),
      callbackURL: config.get("OAuth.facebookAuth.callbackURL"),
    },
    async (accessToken, refreshToken, profile, cb) {
      await User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "/home",
  })
);

module.exports = router;
*/
