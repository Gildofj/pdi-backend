const { model } = require("mongoose");

const productsRepository = require("../repositories/productsRepository");

const Product = model("product");

module.exports = {
  list: () => productsRepository.list(),
  insert: async (json) => {
    const product = new Product(json);
    await productsRepository.insert(product);
  },
  update: async (id, json) => {
    const product = new Product(json);
    await productsRepository.update(id, product);
  },
  remove: async (id) => productsRepository.remove(id),
  updateList: (arrayJson) => {
    arrayJson.map(
      async (json) =>
        await productsRepository.update(json._id, new Product(json)),
    );
  },
};
