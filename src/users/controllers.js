const User = require("./model");

const createUser = async (req, res) => {
  console.log('Request Body: ', req.body);
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(401).json({ message: 'Passwords do not match' });
    }

    const newUser = await User.create({
      username: username,
      email: email,
      password: password
    });

    res.status(201).json({ message: 'User successfully created', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

const updateAccount = async (req, res) => {
  try {
    const filterObj = { id: req.body.id };
    const updateObj = { [req.body.updateKey]: req.body.updateValue };

    await Book.update(updateObj, {
      where: filterObj,
    });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

module.exports = {
  createUser,
  updateAccount,
};