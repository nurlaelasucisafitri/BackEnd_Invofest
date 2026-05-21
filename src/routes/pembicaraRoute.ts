import express from "express";
import { 
    getPembicara, 
    createPembicara, 
    showPembicara, 
    updatePembicara, // <-- PASTIKAN INI SUDAH DITULIS DI SINI
    deletePembicara 
} from "../controllers/pembicaraController.js";

const router = express.Router();

router.get("/", getPembicara);
router.post("/", createPembicara);
router.get("/:id", showPembicara);
router.put("/:id", updatePembicara); // Jalur PUT yang bikin error tadi
router.delete("/:id", deletePembicara);

export default router;