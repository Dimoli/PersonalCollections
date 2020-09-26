const AuthControls = require("./AuthController");

const socialValidation = (socialType) =>
  ["facebook", "google", "vk"].includes(socialType);

const OAuthController = {
  registration: (req, res) =>
    socialValidation(req.params.socialType) &&
    AuthControls.registration(req, res),
  authentication: (req, res) =>
    socialValidation(req.params.socialType) &&
    AuthControls.authentication(req, res),
};

module.exports = OAuthController;
