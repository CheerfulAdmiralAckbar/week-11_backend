const Character = require("./model");

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

    const updatedCharacter = await Character.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Successfully updated character information",
      updatedCharacter,
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

module.exports = {
  addCharacter: addCharacter,
  deleteCharacter: deleteCharacter,
  updateCharacter: updateCharacter,
  getAllCharacters: getAllCharacters,
  getCharacter: getCharacter,
};
