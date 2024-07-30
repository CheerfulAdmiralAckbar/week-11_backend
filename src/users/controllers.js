const User = require("./model");

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
      return res.status(400).json({ message: "Password is incorrect" });
    }
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};


const updateAccount = async (req, res) => {
  try {
    const filterObj = { id: req.body.id };
    const updateObj = { [req.body.updateKey]: req.body.updateValue };

    await User.update(updateObj, {
      where: filterObj,
    });
    const updatedAcc = await User.findOne({ where: filterObj });

    res.status(200).json({ message: "success", updatedAcc: updatedAcc });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

module.exports = {
  createUser,
  login,
  updateAccount,
};

