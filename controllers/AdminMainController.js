const User = require("../models/Users");

const AdminMainController = {
  operation: async (req, res) => {
    try {
      const emails = req.body;
      const operation = req.params.operation;

      if (operation === "block-users") {
        emails.map(async (email) => {
          await User.updateOne({ email }, { $set: { active: false } });
        });
      } else if (operation === "up-users") {
        emails.map(async (email) => {
          await User.updateOne({ email }, { $set: { role: "admin" } });
        });
      } else if (operation === "delete-users") {
        emails.map(async (email) => {
          await User.deleteOne({ email });
        });
      }

      const users = await User.find({});

      res.json({ users });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = AdminMainController;
