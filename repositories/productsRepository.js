const { model } = require("mongoose");

const Product = model("product");

module.exports = {
  list: async () => await Product.find({}),
  insert: async (product) =>
    await product.save((err, product) => {
      if (err) throw new Error(err);
      else return product;
    }),
  update: async (id, product) =>
    await Product.findOneAndUpdate({ _id: id }, { ...product }).exec(),
  remove: async (id) => await Product.findOneAndRemove({ _id: id }),
};
