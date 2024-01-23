const { Router } = require("express");
const UsersRouter = Router();
const {
    getUserHandler,
    postUserHandler,
    deleteUserHandler
  } = require("../Handlers/UsersHandlers");

UsersRouter.get("/", getUserHandler);
UsersRouter.post("/", postUserHandler);
// UsersRouter.put("/", updateCLevelHandler);
 UsersRouter.delete("/:userId", deleteUserHandler);


module.exports = UsersRouter;