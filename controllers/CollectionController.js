const Collection = require("../models/Collections");
const User = require("../models/Users");

const CollectionController = {
  create: async (req, res) => {
    try {
      const { collectionImage, collectionInfo, itemFields, userId } = req.body;
      const { name, description, theme } = collectionInfo;
      const { numerical, oneLine, textual, temporal, boolean } = itemFields;

      const userById = await User.findById(userId).populate("collections");

      const newCollection = await Collection.create({
        name,
        description,
        theme,
        image: collectionImage,
        itemFields: {
          additional: { numerical, oneLine, textual, temporal, boolean },
        },
      });
      await newCollection.save();

      userById.collections.push(newCollection);
      await userById.save();

      res.json(userById.collections);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getCollection: async (req, res) => {
    try {
      const collectionId = req.params.idcoll;

      const itemsByCollection = await Collection.findById(
        collectionId
      ).populate("items");

      res.json(itemsByCollection);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getCollections: async (req, res) => {
    try {
      const { userId } = req.body;

      const collectionsByUser = (await User.findById(userId).populate(
        "collections"
      )) || { collections: [] };

      res.json(collectionsByUser.collections);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  deleteCollection: async (req, res) => {
    try {
      const idcoll = req.params.idcoll;

      await Collection.findByIdAndDelete(idcoll);

      res.json({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  updateCollectionDescription: async (req, res) => {
    try {
      const { description } = req.body;
      const idcoll = req.params.idcoll;

      await Collection.findByIdAndUpdate(idcoll, { description });

      res.json({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = CollectionController;
