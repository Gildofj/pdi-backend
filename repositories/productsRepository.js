const { model } = require("mongoose");

const Product = model("product");

module.exports = {
  list: async () => await Product.find({}),
  insert: async (product) =>
    await product.save((err, product) => {
      if (err) throw new Error(err);
      else return product;
    }),
  remove: async (id) => await Product.findOneAndRemove({ _id: id }),
};
