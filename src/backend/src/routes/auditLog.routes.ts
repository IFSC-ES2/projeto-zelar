import { Router } from "express";
import { AuditLogController } from "../controllers/AuditLogController";

const router = Router();

router.get("/", AuditLogController.findAll);
router.get("/:tabela/:registroId", AuditLogController.findByTableAndRecord);

export default router;
