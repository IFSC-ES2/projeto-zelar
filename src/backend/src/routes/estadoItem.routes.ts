import { Router } from "express";
import { EstadoItemController } from "../controllers/EstadoItemController";

const router = Router();

router.get("/", EstadoItemController.findAll);
router.get("/:id", EstadoItemController.findById);
router.post("/", EstadoItemController.create);
router.put("/:id", EstadoItemController.update);
router.delete("/:id", EstadoItemController.delete);

export default router;
