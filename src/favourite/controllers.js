const User = require('../users/model');
const Character = require('../characters/model');
const Favourite = require('../favourites/model');

const favouriteCharacter = async (req, res) => {
  try {
    const { userId, characterName } = req.body;

    // Check if the user exists before continuing
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the character exists in the database
    const character = await Character.findByPk(characterName);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    // Check if the character is already favourited
    const existingFavourite = await Favourite.findOne({
      where: { userId, characterName }
    });

    if (existingFavourite) {
      return res.status(400).json({ message: "Character is already favourited by this user" });
    }

    // If it gets to this stage the character can be favourited,.
    await Favourite.create({ userId, characterName });

    res.status(201).json({ message: "Character favourited successfully" });
  } catch (error) {
    console.error("Error in favouriteCharacter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { favouriteCharacter };