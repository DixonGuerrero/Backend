import { Router } from 'express'

import { deleteFav, getFavs, getHistory, postfav } from '../controllers/view';

const router = Router();

//Definimos rutas para acceder a los distintos movimientos
router.get('/Favs', getFavs);
router.get('/', getHistory);
router.delete('/:id/', deleteFav);
router.post('/', postfav);

export default router;