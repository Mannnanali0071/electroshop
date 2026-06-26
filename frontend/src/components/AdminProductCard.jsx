import React from "react";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-[#1e1e1e]/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 flex flex-col mx-auto overflow-hidden max-w-[280px] sm:max-w-[300px] w-full">

      {/* Clickable Area */}
      <Link to={`/admin/products/${product._id}`} className="flex-1 block">

        {/* Image Section */}
        <div className="relative w-full overflow-hidden rounded-t-2xl">
          <img
            src={product.image?.url || "/placeholder.png"}
            alt={product.name}
            className="w-full object-cover aspect-[4/3] transition-transform duration-500 ease-in-out hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 transition-opacity"></div>

          {/* Stock Badge */}
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-semibold shadow-md ${
              product.stock > 0
                ? "bg-green-500/20 text-green-300 border border-green-400/40"
                : "bg-red-500/20 text-red-300 border border-red-400/40"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Info Section */}
        <div className="p-4 text-center space-y-2">
          <h3 className="text-gray-100 font-semibold text-base sm:text-lg truncate hover:text-orange-400 transition-colors">
            {product.name}
          </h3>

          {product.price && (
            <p className="text-sm text-gray-400">${product.price.toFixed(2)}</p>
          )}

          {product.category?.name && (
            <p className="text-xs text-gray-500 truncate">{product.category.name}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default AdminProductCard;
