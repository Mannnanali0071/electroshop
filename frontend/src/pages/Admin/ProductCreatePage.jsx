import React from "react";
import { Link } from "react-router-dom";
import ProductCreateForm from "../../components/ProductCreateForm";

const ProductCreatePage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-400">Create Product</h1>
        <Link
          to="/admin/products"
          className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded text-gray-200 font-medium"
        >
          Back to Products
        </Link>
      </div>

      {/* Form Section */}
      <div className="mt-4">
        <ProductCreateForm />
      </div>
    </div>
  );
};

export default ProductCreatePage;
