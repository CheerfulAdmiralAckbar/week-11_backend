const { Router } = require("express");
const userRouter = Router();

const { login } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.post("/login", login);

module.exports = userRouter;
