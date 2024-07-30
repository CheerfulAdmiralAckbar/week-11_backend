const { Router } = require("express");
const userRouter = Router();

const { createUser, login } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.post("/signup", createUser);
userRouter.post("/login", login);

module.exports = userRouter;
