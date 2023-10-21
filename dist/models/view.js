"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connetion_1 = __importDefault(require("../db/connetion")); // Importa la instancia de Sequelize creada anteriormente
const View = connetion_1.default.define('View', {
    id_Vista: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_Persona: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_Pelicula: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    favoritos: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: 'vista',
    createdAt: false,
    updatedAt: false
});
exports.default = View;
