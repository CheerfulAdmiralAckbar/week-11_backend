const { Router } = require("express");
const userRouter = Router();


const { createUser, login, updateAccount } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.post('/signup', createUser);
userRouter.post("/login", login);
userRouter.put("/updateAcc", updateAccount);

module.exports = userRouter;
