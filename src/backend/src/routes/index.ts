import { Router } from "express";
import ambienteRoutes from "./ambiente.routes";
import responsavelRoutes from "./responsavel.routes";
import tipoMaterialRoutes from "./tipoMaterial.routes";

const router = Router();

router.use("/ambientes", ambienteRoutes);
router.use("/responsaveis", responsavelRoutes);
router.use("/tipo-material", tipoMaterialRoutes);

export default router;
