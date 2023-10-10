import { Router } from 'express'
import { deletePerson, getPerson, getPersons, postPerson, updatePerson} from '../controllers/persons';

const router = Router();

//Definimos rutas para acceder a los distintos movimientos
router.get('/', getPersons);
router.get('/:id/', getPerson);
router.delete('/:id/', deletePerson);
router.post('/', postPerson);
router.put('/:id/', updatePerson);

export default router;