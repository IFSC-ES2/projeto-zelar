import { Router } from 'express';
import PatrimonioController from '../controllers/PatrimonioController';

const router = Router();

// Passamos as referências dos métodos. O Express injeta req e res automaticamente.
router.post('/', PatrimonioController.create);
router.get('/', PatrimonioController.index);
router.get('/:id', PatrimonioController.show);
router.put('/:id', PatrimonioController.update);
router.delete('/:id', PatrimonioController.destroy);

export default router;