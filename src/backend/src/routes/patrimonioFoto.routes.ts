import { Router } from "express";
import {
  PatrimonioFotoController,
  uploadFotoMiddleware,
} from "../controllers/PatrimonioFotoController";

const router = Router({ mergeParams: true });

router.get("/", PatrimonioFotoController.list);
router.post("/", uploadFotoMiddleware, PatrimonioFotoController.create);
router.patch("/:fotoId/principal", PatrimonioFotoController.setPrincipal);
router.patch("/:fotoId", PatrimonioFotoController.update);
router.delete("/:fotoId", PatrimonioFotoController.remove);

export default router;
