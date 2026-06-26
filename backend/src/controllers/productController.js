import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';

// Create a product
export async function createProduct(req, res) {
  try {
    // Validate category
    const isCategory = await Category.findById(req.body.category);
    if (!isCategory) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const {
      name,
      description,
      richDescription,
      price,
      brand,
      stock,
      category,
      rating,
      numReviews,
      featured,
    } = req.body;

    // Single main image
    const mainImage = req.files?.mainImage
      ? {
          url: req.files.mainImage[0].path,
          alt: name || 'Product Image',
          public_id: req.files.mainImage[0].filename,
        }
      : null;

    // Multiple gallery images
    const galleryImages = req.files?.images
      ? req.files.images.map((file) => ({
          url: file.path,
          alt: name || 'Gallery Image',
          public_id: file.filename,
        }))
      : [];

    const product = new Product({
      name,
      description,
      richDescription,
      price,
      brand,
      stock,
      category,
      rating: rating || 0,
      numReviews: numReviews || 0,
      isFeatured: featured || false,
      image: mainImage,
      images: galleryImages,
      createdAt: Date.now(),
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get all products
export async function getAllProducts(_, res) {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get product by ID
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product Not Found' });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update a product
export async function updateProduct(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product Not Found' });

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).json({ message: 'Invalid category' });
    }

    let updateData = { ...req.body };

    // Replace main image
    if (req.files?.mainImage && req.files.mainImage.length > 0) {
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }
      updateData.image = {
        url: req.files.mainImage[0].path,
        alt: req.body.name || 'Product Image',
        public_id: req.files.mainImage[0].filename,
      };
    }

    // Replace gallery images
    if (req.files?.images && req.files.images.length > 0) {
      if (product.images?.length) {
        for (let img of product.images) {
          if (img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        }
      }
      updateData.images = req.files.images.map((file) => ({
        url: file.path,
        alt: req.body.name || 'Gallery Image',
        public_id: file.filename,
      }));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ message: error.message });
  }
}

// Delete a product
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product Not Found' });

    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    if (product.images?.length) {
      for (let img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ message: error.message });
  }
}

// Total products count
export const productsCount = async (_, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ totalProducts: count });
  } catch (error) {
    console.error('Error in productsCount:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
