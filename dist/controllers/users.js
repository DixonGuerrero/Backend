"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerson = exports.postPerson = exports.deletePerson = exports.getPerson = exports.getPersons = void 0;
//Control para obtener usuarios
const getPersons = (req, res) => {
    res.json({
        msg: 'Obtener Personas',
    });
};
exports.getPersons = getPersons;
//Control para obtener usuario con id
const getPerson = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'Obtener Persona',
        id
    });
};
exports.getPerson = getPerson;
//Control para eliminiar usuario con id
const deletePerson = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'Eliminar Persona',
        id
    });
};
exports.deletePerson = deletePerson;
//Control para Crear usuario
const postPerson = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'Crear Persona',
        body
    });
};
exports.postPerson = postPerson;
//Control actualizar usuario
const updatePerson = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'post Persona',
        id,
        body
    });
};
exports.updatePerson = updatePerson;
