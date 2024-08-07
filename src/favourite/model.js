const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Favourite = sequelize.define(
  "favourite",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "favourites",
    modelName: "favourite",
    // Stop userId and characterId to prevent duplicate favouriting
    indexes: [
      {
        unique: true,
        fields: ['userId', 'characterId']
      }
    ]
  }
);

module.exports = Favourite;