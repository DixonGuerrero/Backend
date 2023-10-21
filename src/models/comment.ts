import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/connetion'; // Importa la instancia de Sequelize creada anteriormente

const comentario = sequelize.define('comentario', {
  id_comentario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Id_Persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_Pelicula: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  comentario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  tableName: 'comentario',// Nombre de la tabla en la base de datos
  createdAt: false,
  updatedAt: false
});

export default comentario;