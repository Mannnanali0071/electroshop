import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";

const UserLayout = () => {
  const location = useLocation();

  // Routes where Header & Footer should be hidden
  const hideHeaderFooterRoutes = [
    "/signup",
    "/user/register-step-1",
    "/user/register-step-2",
  ];

  // Check if current path matches
  const shouldHide = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Show Header only if not in login/register flow */}
      {!shouldHide && <Header />}

      <main className="flex-grow container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} // ensures animation on route change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Show Footer only if not in login/register flow */}
      {!shouldHide && <Footer />}
    </div>
  );
};

export default UserLayout;
