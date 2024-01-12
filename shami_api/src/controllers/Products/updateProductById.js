const Product = require("../../models/Products").default;

const UpdateProductsById = (productId, updatedProduct) => {
  const product = Product.findByIdAndUpdate(productId,updatedProduct)
  return product;
};

module.exports = UpdateProductsById;