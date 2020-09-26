const { Router } = require("express");
const router = Router();

const AuthControls = require("../controllers/AuthController");

router.post(
  "/registration",
  AuthControls.checkRegistration,
  AuthControls.registration
);
router.post(
  "/authentication",
  AuthControls.checkAuthentication,
  AuthControls.authentication
);

module.exports = router;
