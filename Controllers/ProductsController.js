const productsService = require("../services/productsService");

module.exports = (app) => {
  app.get("/api/products", async (req, res) => {
    const products = await productsService.list();
    res.send(products);
  });

  app.post("/api/products", async (req, res) => {
    try {
      await productsService.insert(req.body);
      res.send(this.props);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      await productsService.remove(req.params.id);
      res.send(this.props);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
