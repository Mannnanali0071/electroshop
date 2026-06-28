import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailes = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`http://electroshop-334x.onrender.com/api/orders/${id}`);
        if (!res.ok) throw new Error("Failed to fetch order details");
        const data = await res.json();
        setOrder(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrderDetails();
  }, [id]);

  const statusColors = {
    Confirm: "bg-green-500",
    Pending: "bg-yellow-500",
    Shipped: "bg-blue-500",
    Delivered: "bg-emerald-600",
    Cancelled: "bg-red-600",
  };

  // 🔹 Skeleton Loader
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>

        <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        ))}

        <div className="mt-6 h-6 bg-gray-300 rounded w-1/4 ml-auto"></div>
      </div>
    );
  }

  // 🔹 Error / Empty States
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 text-lg font-semibold">
        {error}
      </p>
    );
  if (!order)
    return <p className="text-center mt-10 text-gray-600 text-lg">Order not found</p>;

  // 🔹 Main UI
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Order Details
      </h2>

      {/* Order Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Shipping Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Shipping Address
          </h3>
          <div className="text-gray-700 space-y-1">
            <p>{order.shippingAddress1}</p>
            {order.shippingAddress2 && <p>{order.shippingAddress2}</p>}
            <p>
              {order.city}, {order.state} - {order.zip}
            </p>
            <p>{order.country}</p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Order Summary
          </h3>
          <div className="text-gray-700 space-y-1">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  statusColors[order.status] || "bg-gray-400"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalPrice.toLocaleString()}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Ordered Products */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Ordered Products
      </h3>
      <div className="divide-y">
        {order.orderItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product?.image?.url}
                alt={item.product?.image?.alt || "Product"}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div>
                <p className="font-medium text-gray-800">{item.product?.name}</p>
                <p className="text-sm text-gray-600">{item.product?.brand}</p>
                <p className="text-sm text-gray-600">
                  Quantity: <strong>{item.quantity}</strong>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                ₹{item.product?.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 text-right border-t pt-4">
        <p className="text-xl font-bold text-gray-900">
          Grand Total: ₹{order.totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailes;
