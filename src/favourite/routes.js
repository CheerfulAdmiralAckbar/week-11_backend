const { Router } = require("express");
const favRouter = Router();


const {
  favouriteCharacter,
  unfavouriteCharacter
} = require("./controllers");


favRouter.post("/favChar", favouriteCharacter);
favRouter.post("/unfavChar", unfavouriteCharacter);

module.exports = favRouter;
