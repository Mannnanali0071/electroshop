import React, { useEffect, useState } from "react";
import { FaSearch, FaBoxOpen, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const uri = "http://localhost:5001/api/products";
    try {
      const res = await fetch(uri);
      if (!res.ok) {
        console.error("Something went wrong! Try again");
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setShowDropdown(true);
    setIsFiltering(true);

    setTimeout(() => {
      setIsFiltering(false);
    }, 300);
  };

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleSelect = () => {
    setSearch("");
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl z-[9999]">
      {/* Input */}
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-rose-400"
        onChange={handleSearch}
        value={search}
      />

      {/* Icon toggle */}
      {search.length > 0 ? (
        <FaTimesCircle
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg cursor-pointer hover:text-red-500 transition"
          onClick={() => {
            setSearch("");
            setShowDropdown(false);
          }}
        />
      ) : (
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
      )}

      {/* Dropdown */}
      {showDropdown && search.length > 0 && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-[9999] scrollbar-none">
          {isFiltering ? (
            <div className="flex items-center justify-center py-4 text-gray-500">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-rose-500 rounded-full animate-spin mr-2"></div>
              Searching...
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => {
              const { image, name, brand, _id } = product;
              return (
                <Link
                  to={`/product/${_id}`}
                  key={_id}
                  className={`flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors ${
                    index === filteredProducts.length - 1
                      ? "rounded-b-lg"
                      : "border-b border-gray-100"
                  }`}
                  onClick={handleSelect}
                >
                  <img
                    src={image.url}
                    alt={name}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
                      {name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">{brand}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-6 text-gray-500">
              <FaBoxOpen className="text-2xl sm:text-3xl text-gray-400" />
              <p className="text-sm sm:text-base font-medium">No products found</p>
              <p className="text-xs sm:text-sm text-gray-400 text-center">
                Try searching with a different keyword
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
