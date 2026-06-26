import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";

// Users Pages
import Home from "./pages/Home";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import ProductDetail from "./pages/User/ProductDetail";
import Cart from "./pages/User/Cart";
import Profile from "./pages/User/Profile";
import ProductsShop from "./pages/User/ProductsShop";
import OrderDetailes from "./pages/User/OrderDetailes";

// Auth Pages
import RegisterStep1 from "./pages/Auth/RegisterStep1";
import RegisterStep2 from "./pages/Auth/RegisterStep2";
import Login from "./pages/Auth/Login";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import Users from "./pages/Admin/Users";
import DashBoard from "./pages/Admin/DashBoard";
import UserDetailes from "./pages/Admin/UserDetailes";
import Products from "./pages/Admin/Products";
import ProductCreatePage from "./pages/Admin/ProductCreatePage";
import OrdersPage from "./pages/Admin/OrdersPage";
import Categories from "./pages/Admin/Categories";
import ProductDetailes from "./pages/Admin/ProductDetailes";
import OrdersDetails from "./pages/Admin/OrdersDetailes";
import CategoryPage from "./pages/User/CategoryPage";
import ProductEditForm from "./components/ProductEditForm";

/**
 * Protect any logged-in route
 */
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth/login" replace />;
  return element;
};

/**
 * Protect admin-only routes
 */
const AdminRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const isAdmin = JSON.parse(localStorage.getItem("admin")); // ✅ parse back to boolean

  if (!token) return <Navigate to="/auth/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return element;
};

/**
 * Auth Guard → Prevent logged-in users from accessing login/register pages
 */
const Auth = ({ element }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (token) {
    if (
      location.pathname === "/auth/register-step-1" ||
      location.pathname === "/auth/register-step-2" ||
      location.pathname === "/auth/login"
    ) {
      return <Navigate to="/" replace />;
    }
  }
  return element;
};

export default function App() {
  const router = createBrowserRouter([
    // User side
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "cart", element: <Cart /> },
        { path: "category", element: <CategoryPage /> },
        { path: "products", element: <ProductsShop /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "order/:id", element: <OrderDetailes /> },
        { path: "user/profile", element: <ProtectedRoute element={<Profile />} /> },
      ],
    },

    // Admin side
    {
      path: "/admin",
      element: <AdminRoute element={<AdminLayout />} />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "profile", element: <Profile /> },
        { path: "users", element: <Users /> },
        { path: "users/:id", element: <UserDetailes /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetailes /> },
        { path: "products/create", element: <ProductCreatePage /> },
        { path: "products/edit/:id", element: <ProductEditForm /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "orders/:id", element: <OrdersDetails /> },
        { path: "categories", element: <Categories /> },
      ],
    },

    // Auth
    { path: "auth/register-step-1", element: <Auth element={<RegisterStep1 />} /> },
    { path: "auth/register-step-2", element: <Auth element={<RegisterStep2 />} /> },
    { path: "auth/login", element: <Auth element={<Login />} /> },
  ]);

  return <RouterProvider router={router} />;
}
