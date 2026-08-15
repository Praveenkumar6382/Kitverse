import express from "express";
import  authUser  from "../middleware/authMiddleware.js";
import adminUser from "../middleware/adminMiddleware.js"

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProductById);

// Protected routes
productRouter.post("/create", authUser, adminUser,createProduct);
productRouter.put("/update/:id", authUser, adminUser, updateProduct);
productRouter.delete("/delete/:id", authUser, adminUser, deleteProduct);


export default productRouter;