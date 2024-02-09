const Store = require("../../models/Stores");

const getStores = async () => {
  const stores = await Store.find();
  return stores;
};

module.exports = getStores;