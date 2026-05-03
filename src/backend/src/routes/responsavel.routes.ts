import { Router } from "express";
import { ResponsavelController } from "../controllers/ResponsavelController";

const router = Router();

// TODO: este arquivo é apenas um exemplo com GET.
// Ainda falta as demais rotas (POST, PUT, DELETE)
router.get("/", ResponsavelController.findAll);
router.get("/:id", ResponsavelController.findById);

export default router;
