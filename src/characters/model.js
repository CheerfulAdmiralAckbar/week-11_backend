const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Favourite = require('../favourite/model');

const Character = sequelize.define(
  "character",
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pronouns: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    book: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "characters",
    modelName: "character",
  }
);

Character.associate = (models) => {
  Character.belongsToMany(models.User, {
    through: Favourite,
    foreignKey: 'characterName',
    otherKey: 'userId',
  });
};

module.exports = Character;
