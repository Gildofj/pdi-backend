const { model } = require("mongoose");

const productsRepository = require("../repositories/productsRepository");

const Product = model("product");

module.exports = {
  list: () => productsRepository.list(),
  insert: async (json) => {
    const product = new Product(json);
    await productsRepository.insert(product);
  },
  remove: async (id) => productsRepository.remove(id),
};
