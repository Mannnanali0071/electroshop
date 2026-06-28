import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../../components/CartCard";
import { FiShoppingCart } from "react-icons/fi";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shippingData, setShippingData] = useState(null);

  const total = cartData.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  const handleFormSubmit = (data) => {
    setShippingData(data);
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
      alert("Please login or register to place an order.");
      navigate("/auth/register-step-1");
      return;
    }

    if (cartData.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!shippingData) {
      alert("Please fill shipping details first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Backend khud OrderItems create karega
      const orderItems = cartData.map((item) => ({
        product: item._id,
        quantity: item.qty || 1,
      }));

      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          orderItems,
          user: userId,
          status: "Pending",
          ...shippingData,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Order creation failed");
      }

      dispatch(clearCart());
      alert("Order placed successfully with Cash on Delivery!");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Shopping Cart</h1>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 text-gray-500">
          <FiShoppingCart className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-lg font-medium">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {cartData.map((item) => (
              <CartCard
                key={item._id}
                cartData={item}
                onQtyChange={(qty) =>
                  dispatch(updateQuantity({ id: item._id, qty }))
                }
                onRemove={() => dispatch(removeFromCart(item._id))}
              />
            ))}

            <CheckoutForm onSubmit={handleFormSubmit} />
          </div>

          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 sticky top-6 h-fit">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

            <div className="flex justify-between text-gray-700">
              <span>Items ({cartData.length})</span>
              <span>₹ {total.toLocaleString("en-IN")}</span>
            </div>

            <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹ {total.toLocaleString("en-IN")}</span>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Cash on Delivery (COD) only — No online payment required.
            </p>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium text-lg shadow hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Confirm Order (COD)"}
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;