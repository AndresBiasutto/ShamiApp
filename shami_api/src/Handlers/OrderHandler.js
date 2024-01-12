const createOrder= require("../controllers/Order/createOrder")

const createOrderHandler = async (req, res) => {
    const data = req.body;
    try {
      const order = await createOrder(data);
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  module.exports= {createOrderHandler}