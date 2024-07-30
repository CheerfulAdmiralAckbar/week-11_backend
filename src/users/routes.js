const { Router } = require("express");
const userRouter = Router();


const { createUser, login, updateAccount, deleteAccount } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.post('/signup', createUser);
userRouter.post("/login", login);
userRouter.put("/updateAcc", updateAccount);
userRouter.delete("/deleteAcc",deleteAccount);

module.exports = userRouter;
