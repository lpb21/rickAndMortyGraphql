// models/Character.js
const { DataTypes } = require('sequelize');
const { sequelizeMsSQL } = require('../config/database');

const Character = sequelizeMsSQL.define
('Characters', 
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  name: {
    type: DataTypes.STRING, 
  },
  status: {
    type: DataTypes.STRING,
  },
  species: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  origin: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  }
},{
    // La tabla se llama igual al nombre que se definió arriba
    freezeTableName: true,
    // Nombre de tabla no reservado
    tableName: 'Characters',
    // Evita la creación de las columnas createdAt y updatedAt
    timestamps: false
});

module.exports = { Character };