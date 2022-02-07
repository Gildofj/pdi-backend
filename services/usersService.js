const { model } = require("mongoose");

const usersRepository = require("../repositories/usersRepository");
const { getToken } = require("../authenticate");

const User = model("user");

module.exports = {
  fetchById: async (id) => await usersRepository.fetchById(id),

  insert: async (json) => {
    let user;
    if (typeof json !== typeof new User()) user = new User(json);
    else user = json;

    return await usersRepository.insert(user);
  },

  update: async (id, json) => {
    const user = new User(json);
    await usersRepository.update(id, user);
  },

  isLoggedIn: (user) => {
    const token = getToken({ _id: user.id });
    return { ...user._doc, token };
  },
};
