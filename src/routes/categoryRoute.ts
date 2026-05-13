import express from "express";
import { 
    getCategories, 
    createCategories, 
    showCategories, 
    updateCategories, 
    deleteCategories 
} from "../controllers/categoryController";
import { checkAdmin } from "../middlewares/logger"; 

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategories);
router.get("/:id", showCategories);
router.put("/:id", updateCategories);
router.delete("/:id", checkAdmin, deleteCategories);

export default router;