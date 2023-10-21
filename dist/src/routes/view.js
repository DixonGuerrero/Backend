"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const view_1 = require("../controllers/view");
const router = (0, express_1.Router)();
//Definimos rutas para acceder a los distintos movimientos
router.get('/Favs', view_1.getFavs);
router.get('/', view_1.getHistory);
router.delete('/:id/', view_1.deleteFav);
router.post('/', view_1.postfav);
exports.default = router;
