const Collection = require("../models/Collection");
const Item = require("../models/Item");

const ItemController = {
  create: async (req, res) => {
    try {
      const {
        name,
        tag,
        numerical,
        oneLine,
        textual,
        temporal,
        boolean,
        collectionId,
      } = req.body;

      const collectionById = await Collection.findById(collectionId).populate(
        "items"
      );

      const newItem = await Item.create({
        id: collectionById.items.length,
        name,
        tag,
        numerical,
        oneLine,
        textual,
        temporal,
        boolean,
      });

      await newItem.save();

      collectionById.items.push(newItem);
      await collectionById.save();

      res.json(collectionById);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = ItemController;
