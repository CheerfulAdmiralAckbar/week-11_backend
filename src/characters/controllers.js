const Character = require("./model");

const addCharacter = async (req, res) => {
  console.log("req: ", req.body);
  try {
    const character = await Character.create(req.body);

    res.status(201).json({ message: "success", character: character });
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

const getCharacter = async (req, res) => {

  try {
    const character = await Character.findOne({
      where: { name: req.params.name },
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({ message: "Success", character});
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  addCharacter: addCharacter,
  deleteCharacter: deleteCharacter,
  getCharacter: getCharacter
};
