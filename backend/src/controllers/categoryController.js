import Category from "../models/categoryModel.js";


//get All Categories
export async function getAllCategories(_, res) {
  try {
    const category = await Category.find()
    if (!category) return res.status(404).json({ message: 'Category not found !' })
    res.status(200).json(category)
  } catch (error) {
    console.log('error in getAllCategories controller : ', error)
    res.status(500).json({ message: error.message })
  }
}


//Get CategoryBy Id
export async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).json({ message: 'Category not found !' })
    res.status(200).json(category)
  } catch (error) {
    console.log('error in getAllCategory controller : ', error)
    res.status(500).json({ message: error.message })
  }
}

//create Category
export async function createCategory(req, res) {
  try {
    const newCategory = await Category.create(req.body)
    res.status(201).json(newCategory)
  } catch (error) {
    console.log('error in createCategory controller : ', error)
    res.status(500).json({ message: error.message })
  }
}


//update Category
export async function updateCategory(req, res) {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found !' })
    res.status(200).json(updatedCategory)
  } catch (error) {
    console.log('error in updateCategory controller : ', error)
    res.status(500).json({ message: error.message })
  }
}


//delete Category
export async function deleteCategory(req, res) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id)
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found !' })
    res.status(200).json(deletedCategory)
  } catch (error) {
    console.log('error in deleteCategory controller : ', error)
    res.status(500).json({ message: error.message })
  }
}