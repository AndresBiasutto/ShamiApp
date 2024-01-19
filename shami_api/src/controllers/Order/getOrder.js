const Order = require("../../models/Order");
const getProduct = require("../Products/getProduct");

const getOrder = async () => {
  const orders = await Order.find();

  return orders;
};

module.exports = getOrder;
