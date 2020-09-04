const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get("/vkontakte", passport.authenticate("vkontakte"));

router.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("hi");
    // Successful authentication, redirect home.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    res.redirect("/personal-collection");
  }
);

module.exports = router;
