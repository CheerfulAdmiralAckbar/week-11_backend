const User = require("./model");

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

module.exports = { updateAccount };
