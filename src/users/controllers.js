const Character = require("../characters/model");
const User = require("./model");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const createUser = async (req, res) => {
  console.log("Request Body: ", req.body);
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(401).json({ message: "Passwords do not match" });
    }

    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });

    res
      .status(201)
      .json({ message: "User successfully created", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.scope("withPassword").findOne({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const isMatch = await user.isMatch(password);

    if (!isMatch) {
      return res.status(400).json({ error: "error", message: "Password is incorrect" });
    }

    res.status(201).json({ message: "success", user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id, username, email, password } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateObj = {};

    if (username) {
      if (user.username === username) {
        return res
          .status(400)
          .json({ message: "New username is the same as the old username" });
      }
      updateObj.username = username;
    }

    if (email) {
      if (user.email === email) {
        return res
          .status(400)
          .json({ message: "New email is the same as the old email" });
      }
      updateObj.email = email;
    }

    if (password) {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return res
          .status(400)
          .json({ message: "New password is the same as the old password" });
      }
      const salt = await bcrypt.genSalt(saltRounds);
      updateObj.password = await bcrypt.hash(password, salt);
    }

    if (Object.keys(updateObj).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    await User.update(updateObj, {
      where: { id },
    });

    const updatedAcc = await User.findOne({ where: { id } });

    res.status(200).json({ message: "Success", updatedAcc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.destroy({ where: { id: id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createUser,
  login,
  updateAccount,
  deleteAccount,
};
