const { Schema, model } = require("mongoose");

userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  img: String,
  isAdm: Boolean,
});

model("user", userSchema);
