import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaShopify,
  FaSearch,
} from "react-icons/fa";
import Category from "../section/Category.jsx";
import SearchBar from "./SearchBar.jsx";
import { useSelector } from "react-redux";

// Reusable LogoPanel
const LogoPanel = ({ brandName }) => (
  <div className="flex items-center gap-2">
    <FaShopify className="text-2xl text-rose-500" />
    <span className="text-lg font-bold text-rose-500">{brandName}</span>
  </div>
);

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [drawerCategoriesOpen, setDrawerCategoriesOpen] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const cartCount = useSelector((state) => state.cart.items.length);
  const categoryRef = useRef();

  const count = useSelector(state => state.cartCount)
  console.log("initial cart value : ",count)

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const toggleCategories = () => setShowCategories((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };
    if (showCategories) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategories]);

  const userName = localStorage.getItem("name");
  const isAdmin = JSON.parse(localStorage.getItem("admin") || "false");


  const linkStyles = ({ isActive }) =>
    `relative group text-sm md:text-base font-medium px-3 py-1 flex items-center
    ${isActive ? "text-rose-500" : "text-slate-700 hover:text-rose-500"}
    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-rose-500
    after:origin-left after:scale-x-0 group-hover:after:scale-x-100
    ${isActive ? "after:scale-x-100" : ""} after:transition-transform after:duration-300`;

  return (
    <header className="bg-slate-50 shadow-md sticky top-0 z-50 border-b border-slate-200">
      {/* Navbar */}
      <nav className="px-4 py-2 max-w-7xl mx-auto flex items-center justify-between">
        <LogoPanel brandName="YourStore" />

        {/* Search Desktop */}
        <div className="hidden sm:block flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Search */}
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            aria-label="Search"
            className="block sm:hidden text-xl text-slate-700 hover:text-rose-500 transition-colors duration-200"
          >
            <FaSearch />
          </button>

          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative cursor-pointer text-xl text-slate-700 hover:text-rose-500 transition-colors duration-200"
            aria-label="Cart"
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs px-1 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* User */}
          <div className="flex items-center gap-2 text-slate-800 cursor-pointer">
            {userName ? (
              <>
                <Link
                  to="/user/profile"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors duration-200"
                >
                  {userName.charAt(0).toUpperCase()}
                </Link>
                <span className="hidden sm:inline text-sm font-medium text-slate-800">
                  {userName}
                </span>
              </>
            ) : (
              <div className="flex items-center gap-2 text-slate-700">
                <Link
                  to="/auth/register-step-1"
                  className="hover:text-rose-500 transition-colors duration-200 text-xs"
                >
                  Register
                </Link>
                <span>/</span>
                <Link
                  to="/auth/login"
                  className="hover:text-rose-500 transition-colors duration-200 text-xs"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Drawer toggle */}
          <button
            onClick={toggleDrawer}
            className="sm:hidden text-xl text-slate-800 hover:text-rose-500 transition-colors duration-200"
            aria-label="Open Menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      {showMobileSearch && (
        <div className="sm:hidden px-4 pb-2 bg-slate-50 border-t border-slate-200">
          <SearchBar />
        </div>
      )}

      {/* Desktop Nav */}
      <div className="hidden md:flex justify-center items-center gap-6 py-1 bg-slate-50 border-t border-slate-200">
        <NavLink to="/" className={linkStyles}>Home</NavLink>
        <NavLink to="/products" className={linkStyles}>Products</NavLink>
        <NavLink to="/about" className={linkStyles}>About</NavLink>
        <NavLink to="/contact" className={linkStyles}>Contact</NavLink>

        {/* Categories */}
        <div className="relative" ref={categoryRef}>
          <button
            onClick={toggleCategories}
            className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-rose-500 relative group py-1 transition-colors duration-200"
          >
            Categories
            <FaChevronDown
              className={`transition-transform duration-200 ${showCategories ? "rotate-180" : "rotate-0"}`}
            />
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>

          {showCategories && (
            <div className="absolute mt-2 w-56 bg-white text-slate-800 py-4 px-3 rounded shadow-lg z-50 transition-all duration-200">
              <Category onSelectCategory={() => setShowCategories(false)} />
            </div>
          )}
        </div>

        {isAdmin && <NavLink to="/admin" className={linkStyles}>Admin Dashboard</NavLink>}
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg overflow-y-auto ${drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <LogoPanel brandName="Menu" />
          <button
            onClick={toggleDrawer}
            className="text-slate-800 text-xl hover:text-rose-500 transition-colors duration-200"
            aria-label="Close Menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <NavLink to="/" className={linkStyles} onClick={toggleDrawer}>Home</NavLink>
          <NavLink to="/about" className={linkStyles} onClick={toggleDrawer}>About</NavLink>
          <NavLink to="/contact" className={linkStyles} onClick={toggleDrawer}>Contact</NavLink>

          <button
            onClick={() => setDrawerCategoriesOpen((prev) => !prev)}
            className="text-left text-slate-700 hover:text-rose-500 text-sm flex items-center justify-between transition-colors duration-200"
          >
            Categories
            <FaChevronDown
              className={`transition-transform duration-200 ${drawerCategoriesOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {drawerCategoriesOpen && (
            <div className="pl-4 mt-2 border-l border-slate-200">
              <Category onSelectCategory={() => setDrawerCategoriesOpen(false)} />
            </div>
          )}

          {isAdmin && <NavLink to="/admin" className={linkStyles} onClick={toggleDrawer}>Admin Dashboard</NavLink>}
        </div>
      </div>
    </header>
  );
};

export default Header;
