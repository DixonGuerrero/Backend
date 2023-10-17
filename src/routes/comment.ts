import { Router } from 'express'
import { deletecomentario, getcomentarios, postcomentario, getcomentariopl, getcomentario} from '../controllers/comments';

const router = Router();

//Definimos rutas para acceder a los distintos movimientos
router.get('/', getcomentarios);
router.get('/:id/', getcomentario);
router.delete('/:id/', deletecomentario);
router.post('/', postcomentario);
router.get('/pl/:id_Pelicula', getcomentariopl);


export default router;