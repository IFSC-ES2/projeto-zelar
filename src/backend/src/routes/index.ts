import { Router } from "express";
import ambienteRoutes from "./ambiente.routes";
import conferenteRoutes from "./conferente.routes";
import estadoItemRoutes from "./estadoItem.routes";
import fornecedoresRoutes from "./fornecedores.routes";
import patrimonioRoutes from "./patrimonio.routes";
import responsavelRoutes from "./responsavel.routes";
import tipoMaterialRoutes from "./tipoMaterial.routes";
import auditLogRoutes from "./auditLog.routes";
import solicitacaoRoutes from "./solicitacao.routes";

const router = Router();

router.use("/ambientes", ambienteRoutes);
router.use("/conferentes", conferenteRoutes);
router.use("/estados-item", estadoItemRoutes);
router.use("/fornecedores", fornecedoresRoutes);
router.use("/patrimonios", patrimonioRoutes);
router.use("/responsaveis", responsavelRoutes);
router.use("/tipo-material", tipoMaterialRoutes);
router.use("/audit-log", auditLogRoutes);
router.use("/solicitacoes", solicitacaoRoutes);

export default router;
