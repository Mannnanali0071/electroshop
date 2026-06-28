import { useEffect, useState } from "react";
import ProductGrid from "../../components/ProductGrid";

const ProductsShop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://electroshop-334x.onrender.com/api/products");
        if (!res.ok) throw new Error("Problem fetching products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Group products by category
  const categoryMap = products.reduce((acc, product) => {
    const category = product.category?.name || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  // Convert to singular/plural based on product count
  const formatCategory = (name, count) => {
    if (!name) return "";
    if (count > 1) {
      // plural: add 's' if not already ending with 's'
      if (!name.endsWith("s")) return name + "s";
      return name;
    } else {
      // singular: remove trailing 's' if exists
      if (name.endsWith("es")) return name.slice(0, -2);
      if (name.endsWith("s")) return name.slice(0, -1);
      return name;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-pulse">
        {[1, 2, 3].map((_, i) => (
          <section key={i} className="space-y-6">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-4 space-y-3">
                  <div className="w-full h-40 bg-gray-200 rounded-md"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0)
    return <p className="text-center py-10 text-gray-600">No products found 😔</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {Object.keys(categoryMap).map((category) => {
        const items = categoryMap[category];
        const displayCategory = formatCategory(category, items.length);

        return (
          <section key={category} className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {displayCategory}
              </h2>
              <button className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium transition">
                View All →
              </button>
            </div>

            {/* Product Grid */}
            <ProductGrid products={items} />
          </section>
        );
      })}
    </div>
  );
};

export default ProductsShop;
