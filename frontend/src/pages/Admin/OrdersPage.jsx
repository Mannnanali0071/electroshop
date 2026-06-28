import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const uri = "http://electroshop-334x.onrender.com/api/orders";
    try {
      const response = await fetch(uri);
      if (!response.ok) throw new Error("Orders not fetched!");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#121212] min-h-screen text-gray-200">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-orange-400">Orders</h1>

      {orders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full min-w-[750px] text-sm text-left">
            <thead className="bg-[#1f1f1f] text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4 border-b border-gray-700">Order ID</th>
                <th className="p-4 border-b border-gray-700">Customer</th>
                <th className="p-4 border-b border-gray-700">Email</th>
                <th className="p-4 border-b border-gray-700">Phone</th>
                <th className="p-4 border-b border-gray-700">Total Price</th>
                <th className="p-4 border-b border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
                >
                  <td className="p-4 border-b border-gray-800 font-mono text-gray-300">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="p-4 border-b border-gray-800">
                    {order.user?.name || "Guest"}
                  </td>
                  <td className="p-4 border-b border-gray-800">
                    {order.user?.email || "N/A"}
                  </td>
                  <td className="p-4 border-b border-gray-800">
                    {order.user?.phone || "N/A"}
                  </td>
                  <td className="p-4 border-b border-gray-800 font-semibold text-green-400">
                    ₹{order.totalPrice}
                  </td>
                  <td className="p-4 border-b border-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Confirm"
                          ? "bg-green-500/20 text-green-400"
                          : order.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
