const Order = require("../../models/Order");

const createOrder = async (data) => {
  const orderData = {
    store: data.store,
    order: data.order.map(item => ({
      name: item.name,
      storageCapacity: item.storageCapacity,
      category: item.category,
      amount: item.amount || "0",
    }))
  };

  const order = await Order.create(orderData);
  return order;
};

module.exports = createOrder;
