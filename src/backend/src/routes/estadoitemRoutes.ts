import { Router } from 'express';
import EstadoItemController from '../controllers/EstadoItemController';

const router = Router();

router.post('/', EstadoItemController.create);
router.get('/', EstadoItemController.index);
router.get('/:id', EstadoItemController.show);
router.put('/:id', EstadoItemController.update);
router.delete('/:id', EstadoItemController.destroy);

export default router;