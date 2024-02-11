const { Router } = require("express");
const RoleRouter = Router();
const {getRolesHandler} = require("../Handlers/RoleHandlers")

RoleRouter.get("/", getRolesHandler);
//RoleRouter.post("/", postUserHandler);
// RoleRouter.put("/", updateCLevelHandler);
//RoleRouter.delete("/:userId", deleteUserHandler);


module.exports = RoleRouter;