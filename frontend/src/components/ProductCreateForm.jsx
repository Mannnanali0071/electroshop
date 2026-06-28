import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { successMSG } from "../utils/msg";

const ProductCreateForm = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://electroshop-334x.onrender.com/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle multiple images selection
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload up to 5 images only.");
      files.splice(5);
    }
    setImagesFiles(files);
  };

  const onSubmit = async (data) => {
    if (!data.mainImage || data.mainImage.length === 0) {
      setSubmitError("Main image is required.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("richDescription", data.richDescription || "");
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("brand", data.brand);
      formData.append("category", data.category);
      formData.append("isFeatured", data.featured ? "true" : "false");
      formData.append("rating", data.rating || 0);
      formData.append("numReviews", data.numReviews || 0);

      // Main image
      formData.append("mainImage", data.mainImage[0]);

      // Additional images
      imagesFiles.forEach((file) => formData.append("images", file));

      const token = localStorage.getItem("token");
      const res = await fetch("http://electroshop-334x.onrender.com/api/products", {
        method: "POST",
        body: formData,
        headers: { Authorization: token },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create product");
      }

      await res.json();
      successMSG("Product created successfully!");
      reset();
      setImagesFiles([]);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingCategories) return <p>Loading categories...</p>;

  return (
    <div className="bg-[#1a1a1a] text-gray-200 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-orange-400 mb-6">Create New Product</h2>

      {fetchError && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">{fetchError}</div>
      )}
      {submitError && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">{submitError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            {...register("name", { required: "Product name is required" })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
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
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Rich Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Rich Description</label>
          <textarea
            rows="3"
            placeholder="Detailed info"
            {...register("richDescription")}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price required", min: 1 })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              {...register("stock", { required: "Stock required", min: 0 })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              {...register("brand", { required: "Brand required" })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              {...register("category", { required: "Category required" })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Main Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("mainImage", { required: true })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
          />
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Additional Images (max 5)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleMultipleImagesChange}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
          />
        </div>

        {/* Featured & Rating */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("featured")} className="w-4 h-4" />
            <label className="text-sm">Mark as Featured</label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating", {
                min: { value: 0, message: "Min 0" },
                max: { value: 5, message: "Max 5" },
              })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg py-2 font-semibold text-white shadow-md transition ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreateForm;
