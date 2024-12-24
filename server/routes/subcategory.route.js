import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, createSubCategory);
subCategoryRouter.get("/get", getSubCategory);
subCategoryRouter.put("/update", auth, updateSubCategory);
subCategoryRouter.delete("/delete", auth, deleteSubCategory);

export default subCategoryRouter;
