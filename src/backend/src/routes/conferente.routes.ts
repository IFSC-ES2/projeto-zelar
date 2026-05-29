import { Router } from "express";
import { ConferenteController } from "../controllers/ConferenteController";

const router = Router();

router.get("/", ConferenteController.findAll);
router.get("/deletados", ConferenteController.listDeletados);
router.patch("/:id/restaurar", ConferenteController.restaurar);
router.get("/:id", ConferenteController.findById);
router.post("/", ConferenteController.create);
router.put("/:id", ConferenteController.update);
router.delete("/:id", ConferenteController.delete);

export default router;
