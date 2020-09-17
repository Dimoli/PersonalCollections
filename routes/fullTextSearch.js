const { Router } = require("express");
const router = Router();

const Collections = require("../models/Collections");
const Item = require("../models/Items");

router.post("/", async (req, res) => {
  try {
    const searchedData = req.body.searchedData;
    console.log("searchedData", searchedData);

    const foundItems = await Item.find({
      $text: { $search: searchedData, $caseSensitive: false },
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

module.exports = router;
