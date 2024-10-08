const User = require("../users/model");
const Character = require("./model");
const { Op } = require("sequelize");

const addCharacter = async (req, res) => {
  console.log("req: ", req.body);
  try {
    const character = await Character.create(req.body);

    res.status(201).json({ message: "success", character: character });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const updateCharacter = async (req, res) => {
  console.log(req.body);
  try {
    const existingCharacter = await Character.findOne({
      where: { id: req.params.id },
    });
    if (!existingCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    const updateFields = req.body.updateFields || {};
    const updatedData = {};

    for (const key in updateFields) {
      if (
        updateFields[key] !== undefined &&
        updateFields[key] !== null &&
        updateFields[key] !== ""
      ) {
        updatedData[key] = updateFields[key];
      }
    }

    await Character.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });

    const allCharacters = await Character.findAll({
      where: { userId: existingCharacter.userId },
    });

    res.status(200).json({
      message: "Successfully updated character information",
      allCharacters,
    });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const deleteCharacter = async (req, res) => {
  const { name } = req.params;

  try {
    const deleted = await Character.destroy({
      where: { name: name },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};
const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll();

    res.status(200).json({ message: "success", characters: characters });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const getCharacter = async (req, res) => {
  try {
    const character = await Character.findOne({
      where: { name: req.params.name },
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({ message: "Success", character });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const getUserCharacters = async (req, res) => {
  console.log(`Get User Characters`);
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    console.log(`user: ${user}`);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const characters = await Character.findAll({
      where: { UserId: userId },
    });

    res.status(200).json({ characters });
  } catch (error) {
    console.error("Error fetching user characters:", error);
    res.status(500).json({
      message: "Error fetching user characters",
      error: error.message,
    });
  }
};

//This is an improved version of the getCharacter function that utilizes the 'like' operator from React
//allowing the search to find partial matches instead of exact matches

//Example: if the the User enters 'Bran' it will show 'Brandon' and any other name where 'Bran' appears
const getCharactersByName = async (req, res) => {
  try {
    const characters = await Character.findAll({
      where: {
        name: {
          [Op.like]: `%${req.query.name}%`,
        },
      },
    });

    if (!characters || characters.length === 0) {
      return res.status(404).json({ message: "No characters found" });
    }

    res.status(200).json({ message: "Success", characters });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  addCharacter: addCharacter,
  deleteCharacter: deleteCharacter,

  updateCharacter: updateCharacter,

  getAllCharacters: getAllCharacters,

  getCharacter: getCharacter,
  getUserCharacters: getUserCharacters,
  getCharactersByName: getCharactersByName,
};
