const { Schema, model } = require("mongoose");

productSchema = new Schema({
  name: String,
  price: Number,
  position: Number,
});

model("product", productSchema);
