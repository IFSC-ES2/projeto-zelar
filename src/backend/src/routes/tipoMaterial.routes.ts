import { Router } from "express";
import { TipoMaterialController } from "../controllers/TipoMaterialController";

const router = Router();

router.get("/", TipoMaterialController.findAll);
router.get("/:id", TipoMaterialController.findById);
router.post("/", TipoMaterialController.create);
router.put("/:id", TipoMaterialController.update);
router.delete("/:id", TipoMaterialController.delete);

export default router;
