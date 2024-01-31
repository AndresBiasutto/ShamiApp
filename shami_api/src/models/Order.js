const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    store: {
      type: String,
    },
    order: {
      type: Array,
    },
    orderDelivered:{
      type: Boolean
    }
  },
  { timestamps: true, versionKey: false }
);

const Order = new mongoose.model("Order", OrderSchema);

module.exports = Order;
