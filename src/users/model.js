const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { }
    }
  },
  // Fix for SQL error with table name
  tableName: 'users',
  modelName: 'user',
});


// Hash the user password before adding it to the database
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, saltRounds);
});

// Compare the user's password to the hashed password in the database
User.prototype.isMatch = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Remove the password from the JSON response
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;