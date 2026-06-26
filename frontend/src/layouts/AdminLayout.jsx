import { Outlet, NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaShopify,
  FaUserCircle,
  FaHome,
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaTags,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar links
  const links = [
    { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt />, exact: true },
    { to: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
    { to: "/admin/categories", label: "Categories", icon: <FaTags /> },
    { to: "/admin/orders", label: "Orders", icon: <FaClipboardList /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
  ];

  const adminProfile = {
    name: localStorage.getItem("name") || "Admin",
    email: localStorage.getItem("email") || "admin@example.com",
  };

  // Sidebar Component
  const Sidebar = (
    <div className="w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col justify-between h-full">
      <div>
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2 text-orange-500 text-xl font-bold">
            <FaShopify className="text-2xl" />
            <span>YourStore</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-2 relative overflow-y-auto">
          {links.map((link) => (
            <div key={link.to} className="relative">
              <NavLink
                to={link.to}
                end={link.exact}
                onClick={() => setIsSidebarOpen(false)}
                className={() =>
                  `flex items-center gap-2 p-2 rounded transition relative z-10 ${
                    location.pathname.startsWith(link.to)
                      ? "text-orange-400 font-semibold"
                      : "hover:bg-[#2a2a2a]"
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>

              {location.pathname.startsWith(link.to) && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute left-0 bottom-0 h-0.5 w-full bg-orange-500 rounded"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}

          {/* User Dashboard Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 w-full mt-4 p-2 rounded text-gray-300 hover:bg-[#2a2a2a] hover:text-orange-400 transition"
          >
            <FaHome className="text-lg" />
            <span>User Dashboard</span>
          </button>
        </nav>
      </div>

      {/* Admin Profile */}
      <div className="p-4 border-t border-gray-700">
        <Link to="/admin/profile" onClick={() => setIsSidebarOpen(false)}>
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-orange-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-200">{adminProfile.name}</span>
              <span className="text-gray-400 text-sm">{adminProfile.email}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-gray-200">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 bottom-0">{Sidebar}</div>

      {/* Mobile Sidebar (overlay) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 z-50 lg:hidden"
            >
              {Sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button (Top-Right) */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-[#1a1a1a] p-3 rounded-lg text-gray-300 hover:text-orange-400 shadow-lg flex items-center justify-center transition"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Main Content */}
      <main className="flex-grow p-6 w-full lg:ml-64 bg-[#121212]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminLayout;
