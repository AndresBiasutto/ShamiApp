const Product = require("../../models/Products");

const DeleteProductById = (productId) => {
  const product = Product.findByIdAndDelete(productId)
  return product;
};

module.exports = DeleteProductById;