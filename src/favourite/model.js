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
      references: {
        model: 'users',
        key: 'id',
      },
    },
    characterName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'characters',
        key: 'name',
      },
    },
  },
  {
    tableName: "favourites",
    modelName: "favourite",
  }
);

module.exports = Favourite;