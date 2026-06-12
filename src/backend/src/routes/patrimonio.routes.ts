import { Router } from "express";
import { PatrimonioController } from "../controllers/PatrimonioController";

const router = Router();

router.get("/", PatrimonioController.findAll);
router.get("/deletados", PatrimonioController.listDeletados);
router.patch("/:id/restaurar", PatrimonioController.restaurar);
router.get("/:id/historico-estado", PatrimonioController.historicoEstado);
router.get("/:id", PatrimonioController.findById);
router.post("/", PatrimonioController.create);
router.put("/:id", PatrimonioController.update);
router.delete("/:id", PatrimonioController.delete);

export default router;
