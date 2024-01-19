const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order: {
      type: Array,
    },
   },
  { timestamps: true, versionKey: false }
);

const Order = new mongoose.model("Order", OrderSchema);

module.exports = Order;
