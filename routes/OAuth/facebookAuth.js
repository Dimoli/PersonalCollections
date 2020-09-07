/* const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get("/auth/facebook", passport.authenticate("facebook", {session:false}));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "/home",
  })
);

module.exports = router;
*/
