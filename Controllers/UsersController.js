const { model } = require("mongoose");

const User = model("user");

module.exports = (app) => {
  app.get("/api/users/:id", async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const user = new User(req.body);

      await User.findOneAndUpdate({
        _id: req.params.id,
        ...user,
      }).exec();

      res.send(this.props);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
