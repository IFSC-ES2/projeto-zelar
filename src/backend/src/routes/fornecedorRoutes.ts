import { Router } from 'express';
import FornecedorController from '../controllers/FornecedorController';

const router = Router();

router.post('/', FornecedorController.create);
router.get('/', FornecedorController.index);
router.get('/:id', FornecedorController.show);
router.put('/:id', FornecedorController.update);
router.delete('/:id', FornecedorController.destroy);

export default router;