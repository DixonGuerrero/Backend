import { Router } from 'express'
import { deletePerson, getPerson, getPersonByName, getPersons, postPerson, updatePerson} from '../controllers/persons';

const router = Router();
 
//Definimos rutas para acceder a los distintos movimientos
router.get('/', getPersons);
router.get('/:id/', getPerson);
router.get('/name/:nombre_Usuario/' ,getPersonByName);
router.delete('/:id/', deletePerson);
router.post('/', postPerson);
router.put('/:id/', updatePerson);

export default router;