const { Router } = require("express");
const charRouter = Router();

const { addCharacter, deleteCharacter } = require("./controllers");

charRouter.post("/addCharacter", addCharacter);

charRouter.delete("characters/:name", deleteCharacter)

module.exports = charRouter;
