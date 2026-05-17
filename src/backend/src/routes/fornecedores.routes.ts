import { Router } from "express";
import { FornecedorController } from "../controllers/FornecedoresController";

const router = Router();

router.get("/", FornecedorController.findAll);
router.get("/:id", FornecedorController.findById);
router.post("/", FornecedorController.create);
router.put("/:id", FornecedorController.update);
router.delete("/:id", FornecedorController.delete);

export default router;