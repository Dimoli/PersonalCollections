const Collection = require("../models/Collection");
const User = require("../models/User");
const Item = require("../models/Item");

const CollectionController = {
  create: async (req, res) => {
    try {
      const { collectionInfo, itemFields, userId } = req.body;
      const { name, description, theme } = collectionInfo;
      const { numerical, oneLine, textual, temporal, boolean } = itemFields;

      const userById = await User.findById(userId);

      const newCollection = await Collection.create({
        name,
        description,
        theme,
        numerical,
        oneLine,
        textual,
        temporal,
        boolean,
      });
      await newCollection.save();

      userById.collections.push(newCollection);
      await userById.save();

      res.json();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const { userId } = req.body;

      const collectionsByUser = await User.findById(userId).populate(
        "collections"
      );
      /* const collectionsByUser = await Collection.find({
        userId,
        _id: req.params.idcoll - 1,
      }); */
      const collection = collectionsByUser.collections[req.params.idcoll - 1];
      const items = await Collection.findById(collection._id).populate("items");

      res.json({ items });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = CollectionController;
