import express from "express";
import { 
    getEvents, 
    createEvent, 
    showEvent, 
    updateEvent, 
    deleteEvent 
} from "../controllers/eventController.js";

const router = express.Router();

// 1. Ambil semua data event
router.get("/", getEvents);

// 2. Simpan data event baru
router.post("/", createEvent);

// 3. Lihat detail satu event pakai ID
router.get("/:id", showEvent);

// 4. Update data event pakai ID
router.put("/:id", updateEvent);

// 5. Hapus data event pakai ID
router.delete("/:id", deleteEvent);

export default router;