import express from "express";
import {
    getPembicara,
    showPembicara,
    createPembicara,
    updatePembicara,
    deletePembicara,
} from "../controllers/pembicaraController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPembicara);
router.get("/:id", showPembicara);
router.post("/", authenticate, createPembicara);
router.put("/:id", authenticate, updatePembicara);
router.delete("/:id", authenticate, deletePembicara);

export default router;