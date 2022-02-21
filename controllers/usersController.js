const { verifyUser } = require("../authenticate");
const usersService = require("../services/usersService");

module.exports = (app) => {
  app.get("/api/users/me", verifyUser, (req, res, next) => {
    const user = usersService.isLoggedIn(req.user);
    res.send({ success: true, user });
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = usersService.fetchById(req.params.id);
    res.send({ success: true, user });
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const { params, body } = req;
      usersService.update(params.id, body);
      res.send({ success: true });
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
