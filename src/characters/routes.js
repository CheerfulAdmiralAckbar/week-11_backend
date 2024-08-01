const { Router } = require("express");
const charRouter = Router();

const { addCharacter, deleteCharacter, updateCharacter, getCharacter } = require("./controllers");

charRouter.post("/addCharacter", addCharacter);

charRouter.delete("/deleteCharacter/:name", deleteCharacter)

charRouter.get("/getCharacter/:name", getCharacter);

charRouter.put("/updateCharacter/:name", updateCharacter);

module.exports = charRouter;
