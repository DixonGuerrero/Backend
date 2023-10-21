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
exports.loginPerson = exports.updatePerson = exports.postPerson = exports.deletePerson = exports.getPersonByName = exports.getPerson = exports.getPersons = void 0;
const person_1 = __importDefault(require("../models/person"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Control para obtener usuarios
const getPersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPersons = yield person_1.default.findAll();
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
            msg: "Persona no encontrada",
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
            msg: "Persona no encontrada",
        });
    }
    else {
        yield person.destroy();
        res.json({
            msg: "Persona eliminada con exito",
        });
    }
});
exports.deletePerson = deletePerson;
//Control para Crear usuario
const postPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    var nombreValidation = false;
    var passwordValidation = false;
    const correoValidation = yield validateCorreo(body["correo_Electronico"], res);
    if (correoValidation) {
        nombreValidation = yield validateNombreUsuario(body["nombre_Usuario"], res);
    }
    if (nombreValidation) {
        passwordValidation = yield validateContrasenia(body["contrasenia"], res);
    }
    if (correoValidation && nombreValidation && passwordValidation) {
        try {
            yield person_1.default.create(body);
            res.json({
                msg: "Persona Creada con éxito",
                body,
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                msg: "Fallo la creación de la persona",
            });
        }
    }
});
exports.postPerson = postPerson;
//Control actualizar usuario
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    var correoValidation = false;
    var nombreValidation = false;
    var passwordValidation = false;
    if (body.correo_Electronico) {
        correoValidation = yield validateCorreo(body["correo_Electronico"], res);
    }
    else {
        correoValidation = true;
    }
    if (body.nombre_Usuario) {
        if (correoValidation) {
            nombreValidation = yield validateNombreUsuario(body["nombre_Usuario"], res);
        }
    }
    else {
        nombreValidation = true;
    }
    if (body.contrasenia) {
        if (nombreValidation) {
            passwordValidation = yield validateContrasenia(body["contrasenia"], res);
        }
    }
    else {
        passwordValidation = true;
    }
    if (nombreValidation && correoValidation && passwordValidation) {
        try {
            const person = yield person_1.default.findByPk(id);
            if (person) {
                yield person.update(body);
                res.json({
                    msg: "La persona fue actualizada con exito",
                    id,
                    body,
                });
            }
            else {
                res.status(404).json({
                    msg: "La Persona no existe",
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).json({
                msg: "Fallo la actualizacion de la persona",
            });
        }
    }
});
exports.updatePerson = updatePerson;
//Funciones para facilitar validaciones
function validateCorreo(correo, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!correo || !correo.includes("@") || !/@[a-zA-Z]+/.test(correo)) {
            res
                .status(400)
                .json({ msg: `${correo} <- Esto no es una dirección de correo válida` });
            return false;
        }
        const personSearchEmail = yield person_1.default.findOne({
            where: { correo_Electronico: correo },
        });
        if (personSearchEmail) {
            res
                .status(400)
                .json({ msg: `${correo} <- Esta dirección de correo ya existe` });
            return false;
        }
        return true;
    });
}
function validateNombreUsuario(nombreUsuario, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!nombreUsuario || nombreUsuario.length <= 5) {
            res.status(400).json({
                msg: `${nombreUsuario} <- El nombre de usuario requiere al menos 5 caracteres`,
            });
            return false;
        }
        const personSearchNameUser = yield person_1.default.findOne({
            where: { nombre_Usuario: nombreUsuario },
        });
        if (personSearchNameUser) {
            res
                .status(400)
                .json({ msg: `${nombreUsuario} <- Este nombre de usuario ya existe` });
            return false;
        }
        return true;
    });
}
function validateContrasenia(contrasenia, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!contrasenia ||
            contrasenia.length < 8 ||
            !/[\W_]/.test(contrasenia) ||
            contrasenia.length >= 15) {
            res.status(400).json({
                msg: `${contrasenia} <- Esta contraseña no cumple con el estándar`,
            });
            return false;
        }
        const personSearchPassword = yield person_1.default.findOne({ where: { contrasenia } });
        if (personSearchPassword) {
            res
                .status(400)
                .json({ msg: `${contrasenia} <- Esta contraseña no es válida` });
            return false;
        }
        return true;
    });
}
const loginPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_Usuario, contrasenia } = req.body; //aqui se manda solo el username y password ingresados en base de datos
    //se valida que el usuario exista
    const user = yield person_1.default.findOne({
        where: {
            nombre_Usuario: nombre_Usuario,
            contrasenia: contrasenia
        }
    });
    if (!user) {
        return res.status(400).json({
            msg: 'El nombre de usuario o contraseña son erroneos '
        });
    } //if
    //validamos la contraseña
    //creacion del token para permitir entrada
    const token = jsonwebtoken_1.default.sign({
        user
    }, process.env.SECRET_KEY || 'pepito123');
    const userValidation = jsonwebtoken_1.default.decode(token);
    if (userValidation !== null &&
        typeof userValidation === "object" &&
        "user" in userValidation) {
        const user = userValidation.user;
        res.json(user);
    }
    else {
        // Trata el caso en el que userValidation es null o no contiene la propiedad 'user'
        res.status(404).json({ error: "No se encontró un usuario válido" });
    }
});
exports.loginPerson = loginPerson;
