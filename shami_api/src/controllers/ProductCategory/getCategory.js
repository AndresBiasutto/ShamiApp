const ProductCategory = require("../../models/ProductCategory");

const getProductCategory = async () => {
  const product = await ProductCategory.find();
  return product;
};

module.exports = getProductCategory;