const Order= require("../../models/Order")

const updateorderById=(orderId,updatedOrder)=>{
    const order = Order.findByIdAndUpdate(orderId,updatedOrder)
    return order;
}

module.exports= updateorderById;