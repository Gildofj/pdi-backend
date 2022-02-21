const { model } = require("mongoose");

const productsRepository = require("../repositories/productsRepository");

const Product = model("product");

module.exports = {
  list: () => productsRepository.list(),
  insertOrUpdate: async (json) => {
    const product =
      typeof json === typeof new Product() ? json : new Product(json);
    await productsRepository.insertOrUpdate(product);
  },
  remove: async (id) => productsRepository.remove(id),
  updateList: async (arrayJson) => {
    await Promisse.all(
      arrayJson.map(
        async (json) => await this.insertOrUpdate(new Product(json)),
      ),
    );
  },
};
