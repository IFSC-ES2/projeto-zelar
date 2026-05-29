import { Router } from "express";
import { AmbienteController } from "../controllers/AmbienteController";

const router = Router();

router.get("/", AmbienteController.findAll);
router.get("/deletados", AmbienteController.listDeletados);
router.patch("/:id/restaurar", AmbienteController.restaurar);
router.get("/:id", AmbienteController.findById);
router.post("/", AmbienteController.create);
router.put("/:id", AmbienteController.update);
router.delete("/:id", AmbienteController.delete);

export default router;
