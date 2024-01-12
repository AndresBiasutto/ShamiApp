const { Router } = require("express");
const OrdersRouter = Router();
const {createOrderHandler} = require("../Handlers/OrderHandler")

// OrdersRouter.get("/", getOrdersHandler);
// OrdersRouter.get("/:orderId", getOrderByIdHandler);
OrdersRouter.post("/",  createOrderHandler);
// OrdersRouter.put("/:orderId",  UpdateOrderByIdHandler);
// OrdersRouter.delete("/:orderId", deleteOrderByIdHandler);



module.exports = OrdersRouter