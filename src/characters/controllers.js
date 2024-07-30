const Character = require("./model");

const addCharacter = async (req, res) => {
    console.log("req: ", req.body);
    try {

        const character = await Character.create(req.body);

        res.status(201).json({ message: "success", character: character})
    } catch (error) {

        res.status(501).json({ message: error.message, error: error });

    }
}

module.exports = {
    addCharacter: addCharacter,
};
