const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Character = sequelize.define('character', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pronouns: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'characters',
  modelName: 'character'
});

module.exports = Character;