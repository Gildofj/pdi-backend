const { model } = require("mongoose");

const Product = model("product");

module.exports = (app) => {
  app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  });

  app.post("/api/products", async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();

      res.send(this.props);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      await Product.findOneAndRemove({ _id: req.params.id });

      res.send(this.props);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
