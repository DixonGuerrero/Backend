"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connetion_1 = __importDefault(require("../db/connetion")); // Importa la instancia de Sequelize creada anteriormente
const comentario = connetion_1.default.define('comentario', {
    id_comentario: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Id_Persona: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_Pelicula: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'comentario',
    createdAt: false,
    updatedAt: false
});
exports.default = comentario;
