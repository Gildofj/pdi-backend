const { Schema, model } = require("mongoose");

productSchema = new Schema({
  name: String,
  price: Number,
});

model("product", productSchema);
