const Character = require("./model");
const { Op } = require("sequelize");

const addCharacter = async (req, res) => {
  console.log("req: ", req.body);
  try {
    const character = await Character.create(req.body);
    console.log(character);
    res.status(201).json({ message: "success", character: character });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const updateCharacter = async (req, res) => {
  console.log(req.body);
  try {
    const updateInformation = await Character.update(req.body.updateFields, {
      where: {
        id: req.params.id,
      },
    });
    const user = await Character.findOne({ where: { id: req.params.id } });
    res
      .status(200)
      .json({
        message: "Successfully updated character information",
        updateInformation,
        user,
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
      where: {
        name: req.params.name,
      },
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({ message: "Success", character });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
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

    res, status(200).json({ message: "Success", characters });
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
  getCharactersByName: getCharactersByName
};
