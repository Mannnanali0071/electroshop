import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { successMSG } from "../utils/msg";

const ProductEditForm = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://electroshop-334x.onrender.com/api/categories");
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

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://electroshop-334x.onrender.com/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const product = await res.json();

        // Populate form fields
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("richDescription", product.richDescription || "");
        setValue("price", product.price);
        setValue("stock", product.stock);
        setValue("brand", product.brand);
        setValue("category", product.category?._id || "");
        setValue("featured", !!product.isFeatured);
        setValue("rating", product.rating || 0);
        setValue("numReviews", product.numReviews || 0);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  // Submit handler
  const onSubmit = async (data) => {
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

      if (data.mainImage?.length > 0) formData.append("image", data.mainImage[0]);
      if (data.additionalImages?.length > 0) {
        Array.from(data.additionalImages).forEach((file) =>
          formData.append("images", file)
        );
      }

      const token = localStorage.getItem("token");
      const res = await fetch(`https://electroshop-334x.onrender.com/api/products/${id}`, {
        method: "PUT",
        body: formData,
        headers: { Authorization: token },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update product");
      }

      await res.json();
      successMSG("Product updated successfully!");
      setTimeout(() => navigate(-1), 3000); // go back to previous page
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProduct || loadingCategories) return <p>Loading...</p>;

  return (
    <div className="bg-[#1a1a1a] text-gray-200 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-orange-400 mb-6">Edit Product</h2>

      {fetchError && <div className="bg-red-600 text-white p-3 rounded mb-4">{fetchError}</div>}
      {submitError && <div className="bg-red-600 text-white p-3 rounded mb-4">{submitError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            {...register("name", { required: true })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">Product name is required</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="2"
            placeholder="Short description"
            {...register("description", { required: true })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Rich Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Rich Description</label>
          <textarea
            rows="3"
            placeholder="Detailed info"
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
              {...register("price", { required: true, min: 1 })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              placeholder="Stock"
              {...register("stock", { required: true, min: 0 })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              placeholder="Brand"
              {...register("brand", { required: true })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* NumReviews */}
        <div>
          <label className="block text-sm font-medium mb-1">Number of Reviews</label>
          <input
            type="number"
            placeholder="0"
            {...register("numReviews", { min: 0 })}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-1">Main Image</label>
          <input
            type="file"
            {...register("mainImage")}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 file:bg-orange-500 file:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Additional Images</label>
          <input
            type="file"
            multiple
            {...register("additionalImages")}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 file:bg-orange-500 file:text-white"
          />
        </div>

        {/* Featured & Rating */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("featured")} className="w-4 h-4" />
            <label className="text-sm">Mark as Featured</label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating", { min: 0, max: 5 })}
              className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg py-2 font-semibold text-white shadow-md transition ${isSubmitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditForm;
