const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Favourite = require('../favourite/model');

const Character = sequelize.define(
  "character",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    foreignKey: 'characterId',
    otherKey: 'userId',
  });
};

module.exports = Character;