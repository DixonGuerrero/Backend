import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/connetion'; // Importa la instancia de Sequelize creada anteriormente

const View = sequelize.define('View', {
  id_Vista: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_Persona: {
    type: DataTypes.INTEGER,
    

  },
  id_Pelicula: {
    type: DataTypes.INTEGER,
    
    
  },
  
  favoritos: {
    type: DataTypes.BOOLEAN,
    
  },
  fecha: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'vista',// Nombre de la tabla en la base de datos
  createdAt: false,
  updatedAt: false
});

export default View;
