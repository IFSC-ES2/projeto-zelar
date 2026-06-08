import { Router } from 'express';
import { SolicitacaoController } from '../controllers/SolicitacaoController';

const router = Router();

router.get('/', SolicitacaoController.findAll);
router.get('/:id', SolicitacaoController.findById);
router.post('/', SolicitacaoController.create);
router.put('/:id', SolicitacaoController.update);
router.patch('/:id/status', SolicitacaoController.updateStatus);
router.delete('/:id', SolicitacaoController.delete);

export default router;
