import { Router } from 'express';
import ConferenteController from '../controllers/ConferenteController';

const router = Router();

router.post('/', ConferenteController.create);
router.get('/', ConferenteController.index);
router.get('/:id', ConferenteController.show);
router.put('/:id', ConferenteController.update);
router.delete('/:id', ConferenteController.destroy);

export default router;