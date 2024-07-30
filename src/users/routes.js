const { Router } = require("express");
const userRouter = Router();

const { createUser } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.post('/signup', createUser);

module.exports = userRouter;
