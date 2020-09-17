/* const { Router } = require("express");
const router = Router();

const User = require("../models/Users");

router.post("/", async (req, res) => {
  try {
    const soughtData = req.body.soughtData;
    console.log("soughtData", soughtData);

    const foundItems = await User.find({
      $text: { $search: new RegExp(`${soughtData}`, "i") },
    })
      .limit(1)
      .exec((err, data) => {
        console.log(data);
      });

    res.json({ foundItems });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router; */
