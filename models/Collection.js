const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    numerical: [{ type: Number }],
    oneLine: [{ type: Number }],
    textual: [{ type: Number }], //{type: String}
    temporal: [{ type: Number }],
    boolean: [{ type: Number }],
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { versionKey: false }
);

module.exports = model("Collection", collectionSchema);
