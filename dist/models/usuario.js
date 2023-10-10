"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connetion_1 = __importDefault(require("../db/connetion")); // Importa la instancia de Sequelize creada anteriormente
const Persona = connetion_1.default.define('Persona', {
    id_Persona: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_TipoUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    imagen_Perfil: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'https://i.pinimg.com/564x/8e/0c/fa/8e0cfaf58709f7e626973f0b00d033d0.jpg',
    },
    correo_Electronico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nombreUsuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Contrasenia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Persona', // Nombre de la tabla en la base de datos
});
exports.default = Persona;
