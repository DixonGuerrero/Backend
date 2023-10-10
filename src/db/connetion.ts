import { Sequelize } from 'sequelize';


//Creamos conexion a la base de datos
const sequelize = new Sequelize('bzuvqxdb0gacjylgy65t', 'ucul32ufzdihuvea', 'TmHWW5mmVx4tAbkxw5Gh', {
    host: 'bzuvqxdb0gacjylgy65t-mysql.services.clever-cloud.com',
    dialect: 'mysql',
   
});

export default sequelize;
