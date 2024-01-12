const { Router } = require("express");
const UsersRouter = Router();
const {
    getUserHandler,
    postUserHandler
  } = require("../Handlers/UsersHandlers");

UsersRouter.get("/", getUserHandler);
UsersRouter.post("/", postUserHandler);
// UsersRouter.put("/", updateCLevelHandler);
// UsersRouter.delete("/", updateCLevelHandler);


module.exports = UsersRouter;