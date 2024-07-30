const bcrypt = require("bcrypt");

const User = require("../users/model");

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (!compare) {
      res.status(404).json({ message: "incorrect password" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { comparePass: comparePass };
