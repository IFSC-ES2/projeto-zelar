import { Router } from 'express';
import ambienteRoutes from './ambiente.routes';
import responsavelRoutes from './responsavel.routes';

const router = Router();

router.use('/ambientes', ambienteRoutes);
router.use('/responsaveis', responsavelRoutes);

export default router;