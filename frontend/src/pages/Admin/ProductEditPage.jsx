import React, { useState } from 'react'
import ProductEditForm from '../../components/ProductEditForm'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const ProductEditPage = () => {
  const [productData, setProductData] = useState()
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(data)

      })
      const updated = await response.json()
      console.log(updated)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="bg-[#1a1a1a] text-gray-200 rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-orange-400 mb-6">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required" })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="2"
            placeholder="Short description"
            {...register("description", { required: "Description is required" })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Rich Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Rich Description
          </label>
          <textarea
            rows="3"
            placeholder="Detailed product info"
            {...register("richDescription")}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Price in ₹"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              placeholder="Available stock"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock cannot be negative" },
              })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              placeholder="Brand name"
              {...register("brand", { required: "Brand is required" })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Main Image</label>
          <input
            type="file"
            {...register("mainImage", { required: "Main image is required" })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          />
          {errors.mainImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mainImage.message}
            </p>
          )}
        </div>

        {/* Multiple Images */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Additional Images
          </label>
          <input
            type="file"
            multiple
            {...register("additionalImages")}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          />
        </div>

        {/* Featured & Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              {...register("featured")}
              className="w-4 h-4"
            />
            <label htmlFor="featured" className="text-sm">
              Mark as Featured
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="0 - 5"
              {...register("rating", {
                min: { value: 0, message: "Min rating is 0" },
                max: { value: 5, message: "Max rating is 5" },
              })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition rounded-lg py-2 font-semibold text-white shadow-md"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductEditPage