const { Router } = require("express");
const ProductCategory = Router();
const {createProductCategoryHandler, getCategoriesHandler} = require("../Handlers/ProductCategoryHandler")

 ProductCategory.get("/", getCategoriesHandler);
// ProductCategory.get("/:orderId", getOrderByIdHandler);
//ProductCategory.post("/",  createProductCategoryHandler);
// ProductCategory.put("/:orderId",  UpdateOrderByIdHandler);
// ProductCategory.delete("/:orderId", deleteOrderByIdHandler);



module.exports = ProductCategory