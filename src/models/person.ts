import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/connetion'; // Importa la instancia de Sequelize creada anteriormente

const Person = sequelize.define('Persona', {
  id_Persona: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Id_Tipo_Usuario: {
    type: DataTypes.INTEGER,
    defaultValue:2,
  },
  imagen_Perfil: {
    type: DataTypes.STRING,
    defaultValue: 'https://i.pinimg.com/564x/8e/0c/fa/8e0cfaf58709f7e626973f0b00d033d0.jpg',
  },
  correo_Electronico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Persona',// Nombre de la tabla en la base de datos
  createdAt: false,
  updatedAt: false
});

export default Person;
