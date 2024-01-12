const { Router } = require("express");
const AuthRouter = Router();
const {signUpHandler , signInHandler} = require("../Handlers/AuthHandler"); 


AuthRouter.post("/signup", signUpHandler);
AuthRouter.post("/signin", signInHandler);

module.exports = AuthRouter;