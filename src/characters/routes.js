const { Router } = require("express");
const charRouter = Router();

const {
  addCharacter,
  deleteCharacter,
  getAllCharacters,
} = require("./controllers");

charRouter.post("/addCharacter", addCharacter);

charRouter.delete("/deleteCharacter/:name", deleteCharacter);

charRouter.get("/getAllCharacters", getAllCharacters);

module.exports = charRouter;
