const Product = require("../../models/Products");

const getProduct = async () => {
  const product = await Product.find().populate('category');
  return product;
};

module.exports = getProduct;