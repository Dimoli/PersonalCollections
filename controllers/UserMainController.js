const Collection = require("../models/Collections");
const Item = require("../models/Items");

const UserMainController = {
  get: async (req, res) => {
    try {
      const lastAddedItems = await Item.find({}).sort({ date: -1 }).limit(1);
      const bigCollections = await Collection.find({})
        .sort({ items: -1 })
        .limit(1);

      res.json({ lastAddedItems, bigCollections });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = UserMainController;
