import express from "express";
import { getPembicara, createPembicara, deletePembicara } from "../controllers/pembicaraController";

const router = express.Router();

router.get("/", getPembicara);
router.post("/", createPembicara);
router.delete("/:id", deletePembicara); // Jangan lupa titik dua (:) sebelum id

export default router;