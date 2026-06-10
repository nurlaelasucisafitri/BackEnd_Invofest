import express from "express";
import { 
    getCategories, 
    createCategories, 
    showCategories, 
    updateCategories, 
    deleteCategories 
} from "../controllers/categoryController.js";
import { checkAdmin } from "../middlewares/logger.js"; 
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", showCategories);
router.post("/", authenticate, createCategories);
router.put("/:id", authenticate, updateCategories);
router.delete("/:id", authenticate, checkAdmin, deleteCategories);

export default router;