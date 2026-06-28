import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";

// Loader Component
function Loader() {
  return (
    <div className="flex justify-center items-center h-[60vh] bg-[#0d0d0d]">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function OrdersDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://electroshop-334x.onrender.com/api/orders/${id}`);
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-[#0d0d0d] min-h-screen text-gray-200">
      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-orange-400 mb-10 tracking-wide">
        🛒 Order Details
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Info */}
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-6 border border-gray-800 hover:shadow-orange-500/10 transition">
          <h2 className="text-xl font-semibold text-orange-300 mb-5 border-b border-gray-700 pb-2">
            📦 Order Information
          </h2>
          <p><span className="font-medium text-gray-400">Order ID:</span> {order._id}</p>
          <p className="mt-2">
            <span className="font-medium text-gray-400">Status:</span>
            <span
              className={`ml-2 px-3 py-1 rounded-lg text-sm font-semibold ${order.status === "Confirm"
                  ? "bg-green-500/20 text-green-400"
                  : order.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
            >
              {order.status}
            </span>
          </p>
          <p className="mt-2"><span className="font-medium text-gray-400">Total Price:</span> <span className="text-green-400 font-semibold">₹{order.totalPrice.toLocaleString("en-IN")}</span></p>
          <p className="mt-2"><span className="font-medium text-gray-400">Created:</span> {new Date(order.createdAt).toLocaleString()}</p>
          <p className="mt-2"><span className="font-medium text-gray-400">Updated:</span> {new Date(order.updatedAt).toLocaleString()}</p>
        </div>

        {/* Customer Info */}
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-6 border border-gray-800 hover:shadow-indigo-500/10 transition">
          <h2 className="text-xl font-semibold text-orange-300 mb-5 border-b border-gray-700 pb-2">
            👤 Customer Information
          </h2>
          <p><span className="font-medium text-gray-400">Name:</span> {order.user?.name}</p>
          <p className="mt-2"><span className="font-medium text-gray-400">Email:</span> {order.user?.email}</p>
          <p className="mt-2"><span className="font-medium text-gray-400">Phone:</span> {order.user?.phone}</p>
        </div>

        {/* Shipping Info */}
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-6 border border-gray-800 hover:shadow-green-500/10 transition">
          <h2 className="text-xl font-semibold text-orange-300 mb-5 border-b border-gray-700 pb-2">
            🚚 Shipping Address
          </h2>
          <p>{order.shippingAddress1}, {order.shippingAddress2}</p>
          <p>{order.city}, {order.state} - {order.zip}</p>
          <p>{order.country}</p>
          <p className="mt-2"><span className="font-medium text-gray-400">Phone:</span> {order.phone}</p>
        </div>

        {/* Items */}
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-6 border border-gray-800 hover:shadow-purple-500/10 transition">
          <h2 className="text-xl font-semibold text-orange-300 mb-5 border-b border-gray-700 pb-2">
            🛍️ Order Items
          </h2>
          {order.orderItems?.length > 0 ? (
            <ul className="space-y-4">
              {order.orderItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-[#262626] rounded-lg border border-gray-700 hover:scale-[1.02] transition"
                >
                  {/* Product Image */}
                  {item.product?.image?.url && (
                    <img
                      src={item.product.image.url}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-md border border-gray-700"
                    />
                  )}

                  {/* Product Details */}
                  <div>
                    <p className="font-semibold text-gray-200">
                      {item.product?.name || "Unnamed Product"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-green-400 font-semibold">
                      ₹{item.product?.price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No items found.</p>
          )}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="mt-12 flex gap-6 flex-wrap">
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition">
          <FaCheckCircle /> Mark as Shipped
        </button>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition">
          <FaTimesCircle /> Cancel Order
        </button>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition">
          <FaTruck /> Update Status
        </button>
      </div>
    </div>
  );
}
