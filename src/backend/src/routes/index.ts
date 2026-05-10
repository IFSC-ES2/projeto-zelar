import { Router } from 'express';
import patrimonioRoutes from './patrimonioRoutes';
import responsavelRoutes from './responsavelRoutes';
import ambienteRoutes from './ambienteRoutes';
import fornecedorRoutes from './fornecedorRoutes';
import conferenteRoutes from './conferenteRoutes';
import tipomaterialRoutes from './tipomaterialRoutes';
import estadoItemRoutes from './estadoitemRoutes';

const router = Router();

router.use('/patrimonios', patrimonioRoutes);
router.use('/responsaveis', responsavelRoutes);
router.use('/ambientes', ambienteRoutes);
router.use('/fornecedores', fornecedorRoutes);
router.use('/conferentes', conferenteRoutes);
router.use('/tipos-material', tipomaterialRoutes);
router.use('/estados-item', estadoItemRoutes);

export default router;