import { useEffect, useState } from "react";
import Hero from "../section/Hero";
import ProductGrid from "../components/ProductGrid";
import BannerSection from "../section/BannerSection";
import ErrorPage from "../components/ErrorPage";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://electroshop-334x.onrender.com/api/products");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Data fetching error:", error.message);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Hero section */}
      <BannerSection />

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center min-h-[250px]">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#1a1a1a] rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error message */}
      {error && !loading && <ErrorPage message={error} />}

      {/* Content */}
      {!loading && !error && <ProductGrid products={products} />}

      <Hero />
    </div>
  );
};

export default Home;
