const User = require("./model");

const login = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { login: login };
