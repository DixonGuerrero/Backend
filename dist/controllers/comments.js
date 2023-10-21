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
exports.postcomentario = exports.deletecomentario = exports.getcomentariopl = exports.getcomentario = exports.getcomentarios = void 0;
const comment_1 = __importDefault(require("../models/comment"));
//Control para obtener usuarios
const getcomentarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listcomentario = yield comment_1.default.findAll();
    res.json(listcomentario);
});
exports.getcomentarios = getcomentarios;
//Control para obtener usuario con id
const getcomentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const comment = yield comment_1.default.findByPk(id);
    if (comment) {
        res.json(comment);
    }
    else {
        res.status(404).json({
            msg: 'comentario no encontrado'
        });
    }
});
exports.getcomentario = getcomentario;
const getcomentariopl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_Pelicula } = req.params;
    const comment = yield comment_1.default.findAll({
        where: {
            id_Pelicula,
        },
    });
    if (comment) {
        res.json(comment);
    }
    else {
        res.status(404).json({
            msg: 'comentario no encontrado'
        });
    }
});
exports.getcomentariopl = getcomentariopl;
//Control para eliminiar usuario con id
const deletecomentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const comment = yield comment_1.default.findByPk(id);
    if (!comment) {
        res.status(404).json({
            msg: 'comentario no encontrada'
        });
    }
    else {
        yield comment.destroy();
        res.json({
            msg: 'Comentario eliminado con exito'
        });
    }
});
exports.deletecomentario = deletecomentario;
//Control para Crear usuario
const postcomentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //en el body.json no es necesario poner el id de la nueva persona
    const { body } = req;
    let validation = false;
    if (body['comentario']) {
        validation = yield validationComment(body['comentario'], res);
        console.log(body['comentario']);
    }
    ;
    if (validation) {
        console.log(body.comentario);
        try {
            yield comment_1.default.create(body);
            res.json({
                msg: 'comentario creado con exito',
                body
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                msg: 'Fallo la creación del comentario'
            });
        }
    }
});
exports.postcomentario = postcomentario;
//Control actualizar usuario
//funcion para validar comentario 
function validationComment(comentario, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!comentario || comentario.length >= 255) {
            res.json({
                msg: "Alcansaste limite de caracteres"
            });
            return false;
        }
        return true;
    });
}
