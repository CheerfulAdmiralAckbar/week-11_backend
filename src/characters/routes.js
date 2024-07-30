const { Router } = require("express");
const charRouter = Router();

const { addCharacter } = require("./controllers");

charRouter.post("/addCharacter", addCharacter);

module.exports = charRouter;
