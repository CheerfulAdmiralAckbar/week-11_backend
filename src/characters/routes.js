const { Router } = require("express");
const charRouter = Router();

const { addCharacter, deleteCharacter, updateCharacter } = require("./controllers");

charRouter.post("/addCharacter", addCharacter);

charRouter.delete("/deletecharacter/:name", deleteCharacter)

charRouter.put("/updateCharacter/:name", updateCharacter);

module.exports = charRouter;
