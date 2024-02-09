const { Router } = require("express");
const StoreRouter = Router();
const {
    getStoresHandler
  } = require("../Handlers/StoreHandler");

StoreRouter.get("/", getStoresHandler);
//StoreRouter.post("/", postUserHandler);
// StoreRouter.put("/", updateCLevelHandler);
//StoreRouter.delete("/:userId", deleteUserHandler);


module.exports = StoreRouter;