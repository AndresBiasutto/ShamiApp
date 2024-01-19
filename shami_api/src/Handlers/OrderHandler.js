const createOrder = require("../controllers/Order/createOrder");
const getOrder = require("../controllers/Order/getOrder");
const updateorderById = require("../controllers/Order/updateorderById")

const createOrderHandler = async (req, res) => {
  const data = req.body;
  try {
    const order = await createOrder(data);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOrdersHandler = async (req, res) => {
  try {
    const order = await getOrder();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const UpdateOrderByIdHandler = async (req, res) => {
  try {
    const orderid = req.params.orderId;
    const updatedOrder = req.body;
    await updateorderById(orderid, updatedOrder);

    res.status(200).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createOrderHandler,
  getOrdersHandler,
  UpdateOrderByIdHandler,
};
