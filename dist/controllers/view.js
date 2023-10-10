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
exports.postfav = exports.deleteFav = exports.getHistory = exports.getFavs = void 0;
const view_1 = __importDefault(require("../models/view"));
//Control para obtener favoritos
const getFavs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listFavs = yield view_1.default.findAll();
    console.log(listFavs);
    res.json(listFavs);
});
exports.getFavs = getFavs;
//Control para obtener historial
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listhistory = yield view_1.default.findAll();
    console.log(listhistory);
    res.json(listhistory);
});
exports.getHistory = getHistory;
//Control para eliminiar Favorito con id
const deleteFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fav = yield view_1.default.findByPk(id);
    if (!fav) {
        res.status(404).json({
            msg: 'Favorito no encontrado'
        });
    }
    else {
        yield fav.destroy();
        res.json({
            msg: 'Favorito eliminado con exito'
        });
    }
});
exports.deleteFav = deleteFav;
//Control para Crear favorito
const postfav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //en el body.json no es necesario poner el id de la nueva persona
    const { body } = req;
    try {
        yield view_1.default.create(body);
        res.json({
            msg: 'favorito Creada con exito',
            body
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Fallo la creacion de favorito'
        });
    }
});
exports.postfav = postfav;
