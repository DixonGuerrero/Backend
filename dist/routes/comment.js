"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const router = (0, express_1.Router)();
//Definimos rutas para acceder a los distintos movimientos
router.get('/', comments_1.getcomentarios);
router.get('/:id/', comments_1.getcomentario);
router.delete('/:id/', comments_1.deletecomentario);
router.post('/', comments_1.postcomentario);
router.get('/pl/:id_Pelicula', comments_1.getcomentariopl);
exports.default = router;
