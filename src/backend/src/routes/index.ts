import { Router } from "express";
import ambienteRoutes from "./ambiente.routes";
import conferenteRoutes from "./conferente.routes";
import estadoItemRoutes from "./estadoItem.routes";
import fornecedoresRoutes from "./fornecedores.routes";
import responsavelRoutes from "./responsavel.routes";
import tipoMaterialRoutes from "./tipoMaterial.routes";
import auditLogRoutes from "./auditLog.routes";

const router = Router();

router.use("/ambientes", ambienteRoutes);
router.use("/conferentes", conferenteRoutes);
router.use("/estados-item", estadoItemRoutes);
router.use("/fornecedores", fornecedoresRoutes);
router.use("/responsaveis", responsavelRoutes);
router.use("/tipo-material", tipoMaterialRoutes);
router.use("/audit-log", auditLogRoutes);

export default router;
