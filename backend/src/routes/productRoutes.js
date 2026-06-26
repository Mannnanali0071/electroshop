import express from "express";
import { upload } from "../config/cloudinary.js";
import { checkAuthenticate } from "../middlewares/checkAuthenticate.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  productsCount,
} from "../controllers/productController.js";

const router = express.Router();

// Create a product (supports one main image + multiple additional images)
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 10 }, 
  ]),
  checkAuthenticate,
  createProduct
);

// Get all products
router.get("/", getAllProducts);

//  Count endpoint (should come before :id)
router.get("/count", productsCount);

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product (optional images update)
router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 10 }, 
  ]),
  checkAuthenticate,
  updateProduct
);

// Delete a product
router.delete("/:id", checkAuthenticate, deleteProduct);

export default router;
