"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const persons_1 = __importDefault(require("../routes/persons"));
const view_1 = __importDefault(require("../routes/view"));
const connetion_1 = __importDefault(require("../db/connetion"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API WORKING'
            });
        });
        //Definimos ruta base de la api
        this.app.use('/api/personas', persons_1.default);
        this.app.use('/api/vista', view_1.default);
    }
    middlewares() {
        //parseamos el body
        this.app.use(express_1.default.json());
    }
    //Metodo para conectar base de datos
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            //probamos la conexion a la base de datos
            try {
                yield connetion_1.default.authenticate();
                console.log('Conexion exitosa');
            }
            catch (error) {
                console.log(error);
                console.log('Conexion fallida');
            }
        });
    }
}
exports.default = Server;
