import { Router } from 'express';
import responsavelRoutes from './responsavel.routes';

const router = Router();

router.use('/responsaveis', responsavelRoutes);

export default router;