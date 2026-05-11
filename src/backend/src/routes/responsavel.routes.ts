import { Router } from "express";
import { ResponsavelController } from "../controllers/ResponsavelController";

const router = Router();

router.get("/", ResponsavelController.findAll);
router.get("/:id", ResponsavelController.findById);
router.post("/", ResponsavelController.create);
router.put("/:id", ResponsavelController.update);
router.delete("/:id", ResponsavelController.delete);

export default router;
