const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    tag: { type: String, required: true },
    // collectionId: { type: String, required: true },
    numerical: [{ type: Number }],
    oneLine: [{ type: String }],
    textual: [{ type: String }], // update(, , {strict: false}); !OR! findByIdAndUpdate(, , {new: true})
    temporal: [{ type: Date }],
    boolean: [{ type: Boolean }],
    comments: [{ name: String, date: Date, content: String }],
  },
  { versionKey: false }
);

module.exports = model("Item", itemSchema);
