import { Router } from 'express';
import TipoMaterialController from '../controllers/TipoMaterialController';

const router = Router();

router.post('/', TipoMaterialController.create);
router.get('/', TipoMaterialController.index);
router.get('/:id', TipoMaterialController.show);
router.put('/:id', TipoMaterialController.update);
router.delete('/:id', TipoMaterialController.destroy);

export default router;