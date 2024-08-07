const { Router } = require("express");
const charRouter = Router();


const {
  addCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacter,
    updateCharacter
} = require("./controllers");


charRouter.post("/addCharacter", addCharacter);

charRouter.delete("/deleteCharacter/:name", deleteCharacter);

charRouter.get("/getAllCharacters", getAllCharacters);

charRouter.get("/getCharacter/:name", getCharacter);

charRouter.put("/updateCharacter/:id", updateCharacter);

module.exports = charRouter;
