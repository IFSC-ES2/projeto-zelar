import { Router } from 'express';
import AmbienteController from '../controllers/AmbienteController';

const router = Router();

router.post('/', AmbienteController.create);
router.get('/', AmbienteController.index);
router.get('/:id', AmbienteController.show);
router.put('/:id', AmbienteController.update);
router.delete('/:id', AmbienteController.destroy);

export default router;