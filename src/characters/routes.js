const { Router } = require("express");
const charRouter = Router();

const { addCharacter, deleteCharacter } = require("./controllers");

charRouter.post("/addCharacter", addCharacter);

charRouter.delete("/Deletecharacter/:name", deleteCharacter)

module.exports = charRouter;
