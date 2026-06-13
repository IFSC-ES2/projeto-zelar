import { Router } from "express";
import { PatrimonioController } from "../controllers/PatrimonioController";
import patrimonioFotoRoutes from "./patrimonioFoto.routes";

const router = Router();

router.get("/", PatrimonioController.findAll);
router.get("/deletados", PatrimonioController.listDeletados);
router.patch("/:id/restaurar", PatrimonioController.restaurar);
router.get("/:id/historico-estado", PatrimonioController.historicoEstado);
router.get("/:id", PatrimonioController.findById);
router.post("/", PatrimonioController.create);
router.put("/:id", PatrimonioController.update);
router.delete("/:id", PatrimonioController.delete);

router.use("/:patrimonioId/fotos", patrimonioFotoRoutes);

export default router;
