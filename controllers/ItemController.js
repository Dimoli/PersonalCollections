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
  delete: async (req, res) => {
    try {
      const itemId = req.params.iditem;

      await Item.findByIdAndDelete(itemId);

      res.json({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  edit: async (req, res) => {
    try {
      const { fieldName, fieldValue } = req.body;
      const itemId = req.params.iditem;

      if (typeof fieldName === "object") {
        const itemById = await Item.findById(itemId);

        let updatedField = itemById[fieldName[0]];
        updatedField[fieldName[1]] = fieldValue;

        await Item.findByIdAndUpdate(itemId, { [fieldName[0]]: updatedField });
      } else {
        await Item.findByIdAndUpdate(itemId, { [fieldName]: fieldValue });
      }

      res.json({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = ItemController;
