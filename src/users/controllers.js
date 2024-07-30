const User = require("./model");

const login = async (req, res) => {
  try {
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { login: login };
