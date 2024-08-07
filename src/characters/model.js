const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Character = sequelize.define(
  "character",
  {
    name: {
      type: DataTypes.STRING,
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
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    tableName: "characters",
    modelName: "character",
  }
);

module.exports = Character;
