const { model } = require("mongoose");

const User = model("user");

module.exports = {
  fetchById: async (id) => await User.findOne({ _id: id }),

  insert: async (user) => {
    const error = await user.save().catch((err) => err);
    return error;
  },

  update: async (id, user) => {
    await User.findOneAndUpdate({
      _id: id,
      ...user,
    }).exec();
  },
};
