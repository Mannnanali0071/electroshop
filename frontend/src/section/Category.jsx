import { useEffect, useState } from "react";
import { errorMSG } from "../utils/msg";
import { useNavigate } from "react-router-dom";

const Category = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const uri = "http://localhost:5001/api/categories";
      try {
        const res = await fetch(uri);
        if (!res.ok) return errorMSG("Something went wrong while fetching categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        errorMSG("Something went wrong! Please try again.");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const uri = "http://localhost:5001/api/products";
      try {
        const res = await fetch(uri);
        if (!res.ok) return errorMSG("Something went wrong while fetching products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        errorMSG("Something went wrong! Please try again.");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle category click
  const handleClick = (e) => {
    const id = e.target.getAttribute("data-id");
    const filtered = products.filter((element) => element.category._id === id);

    navigate("/category", { state: { products: filtered } });

    // Close dropdown after click
    if (onSelectCategory) onSelectCategory();
  };

  // Loading skeleton
  if (loadingCategories || loadingProducts) {
    return (
      <ul className="space-y-2 text-sm">
        {[1, 2, 3, 4, 5].map((skeleton) => (
          <li
            key={skeleton}
            className="h-4 bg-gray-200 rounded animate-pulse"
          ></li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 text-sm">
      {categories.length > 0 ? (
        categories.map((category) => {
          const { name, _id } = category;
          return (
            <li
              key={_id}
              data-id={_id}
              onClick={handleClick}
              className="hover:text-rose-400 cursor-pointer"
            >
              {name}
            </li>
          );
        })
      ) : (
        <li className="text-gray-500">No categories found.</li>
      )}
    </ul>
  );
};

export default Category;
