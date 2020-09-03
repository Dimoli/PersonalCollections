const { Schema, model } = require("mongoose");

const item = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    tag: { type: String, required: true },
    numerical: { type: [Number] },
    oneLine: { type: [String] },
    textual: { type: [String] }, // update(, , {strict: false}); !OR! findByIdAndUpdate(, , {new: true})
    temporal: { type: [Date] },
    boolean: { type: [Boolean] },
  },
  { versionKey: false }
);

const items = new Schema(
  { value: { type: [item], required: true } },
  { versionKey: false }
);

const collection = new Schema(
  { value: { type: [items], required: true } },
  { versionKey: false }
);

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: String, default: true, required: true },
    role: { type: String, required: true },
    // collections: { type: [collection], required: true },
  },
  { versionKey: false }
);

module.exports = model("User", schema);
