const { Router } = require("express");
const userRouter = Router();

const { createUser, updateAccount, deleteAccount } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.post("/signup", createUser);
userRouter.put("/updateAcc", updateAccount);
userRouter.delete("/deleteAcc", deleteAccount);

module.exports = userRouter;
