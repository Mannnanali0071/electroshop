import React, { useEffect, useState } from "react";
import { errorMSG } from "../../utils/msg";
import AdminProductCard from "../../components/AdminProductCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products");
        if (!response.ok)
          return errorMSG("Failed to fetch products, Try Again");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        errorMSG(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] gap-4 px-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400">Loading products...</p>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 w-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full aspect-[4/3] bg-gray-800 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#121212] min-h-screen text-gray-200">
      {/* Heading + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-400">
          All Products
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <span className="text-gray-300 text-sm bg-gray-800 px-3 py-1 rounded-md">
            Total: {products.length}
          </span>

          <Link
            to="/admin/products/create"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-gray-100 px-4 py-2 rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
          >
            <FaPlus /> Create Product
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
          {products.map((product) => (
            <AdminProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486749.png"
            alt="No products"
            className="w-32 h-32 mb-6 opacity-70"
          />
          <h3 className="text-xl font-semibold text-gray-400">
            Oops! No products found
          </h3>
          <p className="text-gray-500 mt-2">
            You can create a new product using the button above.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
