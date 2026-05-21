import express from "express";
import { 
    getCategories, 
    createCategories, 
    showCategories, 
    updateCategories, 
    deleteCategories 
} from "../controllers/categoryController.js";
import { checkAdmin } from "../middlewares/logger.js"; 

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategories);
router.get("/:id", showCategories);
router.put("/:id", updateCategories);
router.delete("/:id", checkAdmin, deleteCategories);

export default router;