const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Favourite = require('../favourite/model');

const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
    tableName: "users",
    modelName: "user",
  }
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, saltRounds);
});

User.prototype.isMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

User.associate = (models) => {
  User.belongsToMany(models.Character, {
    through: Favourite,
    foreignKey: 'userId',
    otherKey: 'characterId',
  });
};

module.exports = User;