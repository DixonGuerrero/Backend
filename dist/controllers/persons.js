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
exports.updatePerson = exports.postPerson = exports.deletePerson = exports.getPersonByName = exports.getPerson = exports.getPersons = void 0;
const person_1 = __importDefault(require("../models/person"));
//Control para obtener usuarios
const getPersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPersons = yield person_1.default.findAll();
    console.log(listPersons);
    res.json(listPersons);
});
exports.getPersons = getPersons;
//Control para obtener usuario con id
const getPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const person = yield person_1.default.findByPk(id);
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
});
exports.getPerson = getPerson;
//Crontol para obtener el usuario por nombre_Usuario
const getPersonByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_Usuario } = req.params;
    const person = yield person_1.default.findOne({
        where: {
            nombre_Usuario: nombre_Usuario,
        },
    });
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
});
exports.getPersonByName = getPersonByName;
//Control para eliminiar usuario con id
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const person = yield person_1.default.findByPk(id);
    if (!person) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
    else {
        yield person.destroy();
        res.json({
            msg: 'Persona eliminada con exito'
        });
    }
});
exports.deletePerson = deletePerson;
//Control para Crear usuario
const postPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //En el body.json no es necesario poner el id de la nueva persona
    const { body } = req;
    try {
        yield person_1.default.create(body);
        res.json({
            msg: 'Persona Creada con exito',
            body
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Fallo la creacion de la persona'
        });
    }
});
exports.postPerson = postPerson;
//Control actualizar usuario
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const person = yield person_1.default.findByPk(id);
        if (person) {
            yield person.update(body);
            res.json({
                msg: 'La persona fue actualizada con exito',
                id,
                body
            });
        }
        else {
            res.status(404).json({
                msg: 'La Persona no existe'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'Fallo la actualizacion de la persona'
        });
    }
});
exports.updatePerson = updatePerson;
