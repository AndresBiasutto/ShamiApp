const { Router } = require("express");
const { verifyToken,
    isModerator,
    isAdmin } = require("../middlewares/index")
const { getProductsHandler,
    createProductHandler,
    deleteProductByIdHandler,
    getProductByIdHandler,
    UpdateProductsByIdHandler } = require("../Handlers/ProductsHandler")

const ProductsRouter = Router();

ProductsRouter.get("/", getProductsHandler);
ProductsRouter.get("/:productId", getProductByIdHandler);
ProductsRouter.post("/",  createProductHandler);
ProductsRouter.put("/:productId",  UpdateProductsByIdHandler);
ProductsRouter.delete("/:productId", deleteProductByIdHandler);

//[verifyToken, isModerator]
// [verifyToken, isModerator]
//  [verifyToken, isAdmin],
module.exports = ProductsRouter;