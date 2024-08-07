const { Router } = require("express");
const favouriteRouter = Router();


const {
  favouriteCharacter
} = require("./controllers");


charRouter.post("/favouriteCharacter", favouriteCharacter);

module.exports = charRouter;
