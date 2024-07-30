const { Router } = require("express");
const userRouter = Router();

const { createUser, updateAccount } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.post('/signup', createUser);
userRouter.put("/updateAcc", updateAccount);


module.exports = userRouter;
