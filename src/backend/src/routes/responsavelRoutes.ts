import { Router } from 'express';
import ResponsavelController from '../controllers/ResponsavelController';

const router = Router();

router.post('/', ResponsavelController.create);
router.get('/', ResponsavelController.index);
router.get('/:id', ResponsavelController.show);
router.put('/:id', ResponsavelController.update);
router.delete('/:id', ResponsavelController.destroy);

export default router;