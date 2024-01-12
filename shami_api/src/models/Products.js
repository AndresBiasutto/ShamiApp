const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    imgURL: {
      type: String,
    },
    storageCapacity: {
      type: String,
    },
    storage: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = new mongoose.model("Product", ProductsSchema);

module.exports = Product;
