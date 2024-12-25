import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductDetail,
  searchProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/create", auth, admin, createProduct);
productRouter.get("/get", getProduct);
productRouter.get("/get-product-by-category", getProductByCategory);
productRouter.get(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
productRouter.get("/get-product-details", getProductDetail);

//update product
productRouter.put("/update-product-details", auth, admin, updateProduct);

//delete product
productRouter.delete("/delete-product", auth, admin, deleteProduct);

//search product
productRouter.post("/search-product", searchProduct);

export default productRouter;
