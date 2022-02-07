const { model } = require("mongoose");

const { getToken, getRefreshToken } = require("../authenticate");
const usersService = require("./usersService");

const User = model("user");

module.exports = {
  register: async (json) => {
    const user = new User(json);
    User.register(user, json.password, async (err, user) => {
      if (err) {
        throw new Error(err);
      } else {
        user.name = json.name;
        user.phone = json.phone;
        user.img = json.img;
        user.isAdm = json.isAdm;
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        await usersService.insert(user);
        return { token, refreshToken };
      }
    });
  },

  login: async (id) => {
    const token = getToken({ _id: id });
    const refreshToken = getRefreshToken({ _id: id });

    const user = await usersService.fetchById(id);
    user.refreshToken.push({ refreshToken });
    await usersService.insert(user);
    return { token, refreshToken };
  },

  refreshToken: async (id) => {
    const user = await usersService.fetchById(id);

    if (user) {
      // Find the refresh token against the user record in database
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken,
      );

      if (tokenIndex === -1) {
        throw new Error("Unauthorized");
      } else {
        const token = getToken({ _id: userId });
        // If the refresh token exists, then create new one and replace it.
        const newRefreshToken = getRefreshToken({ _id: userId });
        user.refreshToken[tokenIndex] = {
          refreshToken: newRefreshToken,
        };

        await usersService.insert(user);
        return { token, newRefreshToken };
      }
    }
  },

  logout: async () => {
    const user = await usersService.fetchById(id);

    const tokenIndex = user.refreshToken.findIndex(
      (item) => item.refreshToken === refreshToken,
    );

    if (tokenIndex !== -1) {
      user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
    }

    await usersService.insert(user);
  },
};
