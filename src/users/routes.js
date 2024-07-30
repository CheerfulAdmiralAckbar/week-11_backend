const { Router } = require("express");
const userRouter = Router();

const { updateAccount } = require("./controllers");
const {} = require("../middleware/auth");

userRouter.put("/updateAcc", updateAccount);

module.exports = userRouter;
