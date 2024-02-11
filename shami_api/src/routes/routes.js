const { Router } = require("express");
const UsersRouter = require("./UsersRouter");
const AuthRouter = require("./AuthRouter");
const OrderRouter = require("./OrderRouter");
const ProductsRouter = require("./ProductsRouter");
const ProductCategoryRouter = require("./ProductCategoryRouter");
const StoreRouter = require("./StoreRouter");
const RoleRouter=require("./RoleRouter")
const router = Router();

router.use("/user", UsersRouter);
router.use("/auth", AuthRouter);
router.use("/products", ProductsRouter);
router.use("/productcategory", ProductCategoryRouter);
router.use("/order", OrderRouter);
router.use("/store", StoreRouter);
router.use("/role", RoleRouter);

module.exports = router;