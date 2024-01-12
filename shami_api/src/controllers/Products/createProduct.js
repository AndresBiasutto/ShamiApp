const Product = require("../../models/Products");



const createProduct = async ({name, category, imgURL, storage, storageCapacity}) => {
  const product=  await Product.create({
    name, category, imgURL, storage, storageCapacity
  });
  return product;
};

module.exports = createProduct;