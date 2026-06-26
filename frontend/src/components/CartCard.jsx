import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/slices/cartSlice";

const CartCard = ({ cartData }) => {
  const dispatch = useDispatch();

  if (!cartData) return null;

  // Update quantity
  const updateQty = (type) => {
    const newQty = type === "inc" ? (cartData.qty || 1) + 1 : (cartData.qty || 1) - 1;
    if (newQty > 0) {
      dispatch(updateQuantity({ id: cartData._id, qty: newQty }));
    } else {
      dispatch(removeFromCart(cartData._id));
    }
  };

  // Remove item
  const handleRemove = () => {
    dispatch(removeFromCart(cartData._id));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      {/* Product Image */}
      <div className="flex-shrink-0 w-full sm:w-28 h-28 sm:h-28 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={cartData.image?.url || cartData.image}
          alt={cartData.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{cartData.name}</h3>
        {cartData.brand && (
          <p className="text-gray-500 text-sm sm:text-base">{cartData.brand}</p>
        )}
        <p className="text-green-600 font-bold text-lg sm:text-xl">
          ₹ {(cartData.price * (cartData.qty || 1)).toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQty("dec")}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            -
          </button>
          <span className="font-medium text-base sm:text-lg">{cartData.qty || 1}</span>
          <button
            onClick={() => updateQty("inc")}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-row gap-2 mt-4">
          <Link
            to={`/product/${cartData._id}`}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105 text-center"
          >
            View Details
          </Link>

          <button
            onClick={handleRemove}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow flex items-center justify-center transition-transform transform hover:scale-105"
          >
            <FaTrash className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
