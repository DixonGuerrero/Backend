"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Creamos conexion a la base de datos
const sequelize = new sequelize_1.Sequelize('bzuvqxdb0gacjylgy65t', 'ucul32ufzdihuvea', 'TmHWW5mmVx4tAbkxw5Gh', {
    host: 'bzuvqxdb0gacjylgy65t-mysql.services.clever-cloud.com',
    dialect: 'mysql',
});
exports.default = sequelize;
