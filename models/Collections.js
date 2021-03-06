const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    image: String,
    itemFields: {
      basic: {
        id: { type: String, default: "id" },
        name: { type: String, default: "name" },
        tag: { type: String, default: "tag" },
      },
      additional: {
        numerical: [{ type: Number }],
        oneLine: [{ type: Number }],
        textual: [{ type: Number }],
        temporal: [{ type: Number }],
        boolean: [{ type: Number }],
      },
    },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { versionKey: false }
);

collectionSchema.index({ "$**": "text" });

module.exports = model("Collection", collectionSchema);
