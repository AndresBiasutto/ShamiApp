const { Router } = require("express");
const UsersRouter = Router();
const {
    getUserHandler,
    postUserHandler,
    deleteUserHandler,
    putUserByIdHandler
  } = require("../Handlers/UsersHandlers");

UsersRouter.get("/", getUserHandler);
UsersRouter.post("/", postUserHandler);
UsersRouter.put("/:userId", putUserByIdHandler);
 UsersRouter.delete("/:userId", deleteUserHandler);


module.exports = UsersRouter;