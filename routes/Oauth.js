const { Router } = require("express");
const router = Router();

const OAuthControls = require("../controllers/OAuthController");

router.post("/:socialType/registration", OAuthControls.registration);
router.post("/:socialType/authentication", OAuthControls.authentication);

module.exports = router;
