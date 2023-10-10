"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persons_1 = require("../controllers/persons");
const router = (0, express_1.Router)();
//Definimos rutas para acceder a los distintos movimientos
router.get('/', persons_1.getPersons);
router.get('/:id/', persons_1.getPerson);
router.delete('/:id/', persons_1.deletePerson);
router.post('/', persons_1.postPerson);
router.put('/:id/', persons_1.updatePerson);
exports.default = router;
