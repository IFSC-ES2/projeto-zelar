import { Router } from 'express';
import ambienteRoutes from './ambiente.routes';
import fornecedoresRoutes from './fornecedores.routes';
import responsavelRoutes from './responsavel.routes';

const router = Router();

router.use('/ambientes', ambienteRoutes);
router.use('/fornecedores', fornecedoresRoutes);
router.use('/responsaveis', responsavelRoutes);

export default router;
