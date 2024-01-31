const Order = require("../../models/Order");

const createOrder = async (data) => {
  const orderData = {
    store: data.store,
    orderDelivered: false,
    order: data.order.map(item => ({
      name: item.name,
      storageCapacity: item.storageCapacity,
      category: item.category,
      amount: item.amount || "0",
      orderDelivered: item.orderDelivered,
      inStock: true
    }))
  };

  const order = await Order.create(orderData);
  return order;
};

module.exports = createOrder;
