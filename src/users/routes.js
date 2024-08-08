const { Router } = require("express");
const userRouter = Router();


const { createUser, login, updateAccount, deleteAccount, verifyTokenController } = require("./controllers");
const { verifyToken } = require("../middleware/auth");

userRouter.post('/signup', createUser);
userRouter.post("/login", login);
userRouter.put("/updateAcc", updateAccount);
userRouter.delete("/deleteAcc/:id",deleteAccount);
userRouter.get("/verify-token", verifyToken, verifyTokenController)


module.exports = userRouter;
