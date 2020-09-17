const { Router } = require("express");
const router = Router();

const Collection = require("../models/Collections");
const Item = require("../models/Items");

router.post("/", async (req, res) => {
  try {
    const searchedData = req.body.searchedData;

    const items =
      (await Item.find({
        $text: { $search: searchedData, $caseSensitive: false },
      })) || {};
    const itemsByCollections =
      (await Collection.find({
        $text: { $search: searchedData, $caseSensitive: false },
      })) || {};

    res.json(Object.assign(items, itemsByCollections));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
