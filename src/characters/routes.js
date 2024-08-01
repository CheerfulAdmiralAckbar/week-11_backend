const { Router } = require("express");
const charRouter = Router();

const { addCharacter, deleteCharacter, getCharacter } = require("./controllers");

charRouter.post("/addCharacter", addCharacter);

charRouter.delete("/deleteCharacter/:name", deleteCharacter)

charRouter.get("/getCharacter/:name", getCharacter);

module.exports = charRouter;
