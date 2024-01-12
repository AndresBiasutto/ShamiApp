const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      }
    },
    { timestamps: true, versionKey: false }
  );
  
  const ProductCategory = new mongoose.model("ProductCategory", ProductCategorySchema);
  
  module.exports = ProductCategory;