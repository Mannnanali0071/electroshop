import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import ErrorPage from "../../components/ErrorPage";

const CategoryPage = () => {
  const location = useLocation();
  const products = location.state?.products || [];

  // Get category name safely
  const categoryName =
    products.length > 0
      ? products[0]?.category?.name || "Unknown Category"
      : "No Products Found";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {categoryName}
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          {products.length > 0
            ? `Explore ${products.length} product${
                products.length > 1 ? "s" : ""
              } in this category`
            : "Check back later for new items."}
        </p>
      </div>

      {/* Products Grid or Error Page */}
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="transition-transform duration-200 hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <ErrorPage message="It looks like there are no products available for this category." />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
