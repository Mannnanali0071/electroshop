import React, { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reusable Stat Card
const StatCard = ({ title, value, Icon, loading, color }) => (
  <div
    className="bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-md p-4 sm:p-5 flex items-center justify-between
    transition-transform transform hover:scale-105 hover:border-orange-400 cursor-pointer w-full"
  >
    <div>
      <p className="text-xs sm:text-sm text-gray-400">{title}</p>
      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-100 mt-1">
        {loading ? "..." : value}
      </h2>
    </div>
    <div className={`p-2 sm:p-3 rounded-full ${color}`}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

const formatCurrency = (num) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(num);

const DashBoard = () => {
  const [productsCount, setProductsCount] = useState({ totalProducts: 0 });
  const [usersCount, setUsersCount] = useState({ totalUsers: 0 });
  const [ordersCount, setOrdersCount] = useState({ totalOrders: 0 });
  const [revenue, setRevenue] = useState({ totalSales: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsRes, usersRes, ordersRes, salesRes, recentOrdersRes] =
          await Promise.all([
            fetch("https://electroshop-334x.onrender.com/api/products/count"),
            fetch("https://electroshop-334x.onrender.com/api/auth/users/count"),
            fetch("https://electroshop-334x.onrender.com/api/orders/get/count"),
            fetch("https://electroshop-334x.onrender.com/api/orders/get/totalSales"),
            fetch("https://electroshop-334x.onrender.com/api/orders"),
          ]);

        if (!productsRes.ok || !usersRes.ok) throw new Error("Failed to fetch counts");

        setProductsCount(await productsRes.json());
        setUsersCount(await usersRes.json());
        setOrdersCount(await ordersRes.json());
        setRevenue(await salesRes.json());
        setRecentOrders(await recentOrdersRes.json());
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="space-y-6 px-3 sm:px-6 md:px-10 py-4">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">
        Admin Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Link to={"/admin/users"}>
          <StatCard
            title="Total Users"
            value={usersCount.totalUsers}
            Icon={FaUsers}
            loading={loading}
            color="bg-teal-500/10 text-teal-400"
          />
        </Link>
        <Link to={"/admin/products"}>
          <StatCard
            title="Products"
            value={productsCount.totalProducts}
            Icon={FaBoxOpen}
            loading={loading}
            color="bg-orange-500/10 text-orange-400"
          />
        </Link>
        <Link to={"/admin/orders"}>
          <StatCard
            title="Orders"
            value={ordersCount.totalOrders}
            Icon={FaShoppingCart}
            loading={loading}
            color="bg-yellow-500/10 text-yellow-400"
          />
        </Link>
        <StatCard
          title="Revenue"
          value={formatCurrency(revenue.totalSales)}
          Icon={FaRupeeSign}
          loading={loading}
          color="bg-green-500/10 text-green-400"
        />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">
          Recent Orders
        </h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px] sm:min-w-[700px] text-left text-xs sm:text-sm text-gray-400">
            <thead>
              <tr className="border-b border-gray-700 text-xs sm:text-sm">
                <th className="py-2 px-2">Order ID</th>
                <th className="py-2 px-2">Customer</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2">Phone</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-800 hover:bg-[#2a2a2a] transition"
                  >
                    <td className="py-2 px-2">{order._id.slice(-6)}</td>
                    <td className="py-2 px-2">{order.user?.name || "Guest"}</td>
                    <td className="py-2 px-2">{order.user?.email || "N/A"}</td>
                    <td className="py-2 px-2">{order.phone || order.user?.phone}</td>
                    <td className="py-2 px-2 font-semibold text-gray-200">
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td className="py-2 px-2">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${order.status === "Confirm"
                            ? "bg-green-500/20 text-green-400"
                            : order.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">
          Sales Overview
        </h2>
        <div className="w-full h-40 sm:h-56 md:h-64 flex items-center justify-center text-gray-500">
          📊 Chart Placeholder (Integrate Recharts here)
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashBoard;
