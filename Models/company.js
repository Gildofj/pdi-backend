const { Schema, model } = require("mongoose");

companySchema = new Schema({
  name: String,
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

model("company", companySchema);
