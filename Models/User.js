const { Schema, model } = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

const session = new Schema({
  refreshToken: String,
});

const userSchema = new Schema({
  name: String,
  phone: String,
  img: String,
  isAdm: Boolean,
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [session],
  },
});

//Remove refreshToken from the response
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

userSchema.plugin(passportLocalMongoose);

model("user", userSchema);
