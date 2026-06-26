import express from "express"
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory
} from "../controllers/categoryController.js"

const router = express.Router()



//Get All Categories
router.get('/', getAllCategories)

//Get Category By Id
router.get('/:id', getCategoryById)

//Create Category
router.post('/', createCategory)

//Update Category
router.put('/:id', updateCategory)

//Delete Category
router.delete('/:id', deleteCategory)


export default router