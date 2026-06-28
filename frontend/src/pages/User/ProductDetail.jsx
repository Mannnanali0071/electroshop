import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

// Loader Component
function Loader() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

// Image Gallery Component
function ImageGallery({ images, mainImage, setMainImage }) {
  return (
    <div className="lg:w-1/2 flex flex-row gap-3 mb-8 lg:mb-0">
      {/* Thumbnails Vertical */}
      {images?.length > 0 && (
        <div className="flex flex-col gap-2 overflow-y-auto hide-scrollbar max-h-[450px]">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.alt || `product-${idx}`}
              onClick={() => setMainImage(img.url)}
              className={`h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-md border cursor-pointer transition
                ${
                  mainImage === img.url
                    ? "border-indigo-600"
                    : "border-gray-300 hover:border-indigo-300"
                }`}
            />
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl shadow-md overflow-hidden">
        <img
          src={mainImage || "/placeholder.png"}
          alt="Main product"
          className="w-full max-h-[450px] object-contain transition-transform duration-500 ease-in-out"
        />
      </div>
    </div>
  );
}

// Product Detail Component
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`s://electroshop-334x.onrender.com/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();

        setProductDetail(data);
        setMainImage(data.image?.url || data.images?.[0]?.url || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProductDetails();
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(productDetail)); // Redux handles cart & localStorage
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <div className="p-6"><Loader /></div>;
  if (error) return <div className="p-6 text-red-400">⚠ {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* Left side: Image gallery */}
        <ImageGallery
          images={[
            ...(productDetail.image?.url ? [productDetail.image] : []),
            ...(productDetail.images || []),
          ]}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />

        {/* Right side: Product Info */}
        <div className="lg:w-1/2 flex flex-col mt-6 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {productDetail.name}
          </h1>

          {productDetail.brand && (
            <p className="text-sm text-gray-500 mb-4">
              Brand: <span className="font-medium">{productDetail.brand}</span>
            </p>
          )}

          {productDetail.rating && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="text-gray-700 font-medium">
                {productDetail.rating} / 5
              </span>
              <span className="text-sm text-gray-500">
                ({productDetail.numReviews || 0} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
            ₹{productDetail.price.toLocaleString("en-IN")}
          </p>

          {/* Stock */}
          <p
            className={`mb-4 font-medium ${
              productDetail.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {productDetail.stock > 0
              ? `In Stock (${productDetail.stock} available)`
              : "Out of Stock"}
          </p>

          {/* 💵 Cash on Delivery Only */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-600 text-lg">💵</span>
            <span className="text-gray-700 font-medium">
              Cash on Delivery (COD) Available — No Online Payment Required
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-transform transform hover:scale-105"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Description (Bullet Points) */}
          {productDetail.description && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {productDetail.description.split("\n").map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Rich Description */}
          {productDetail.richDescription && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Details:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {productDetail.richDescription.split("\n").map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Category */}
          {productDetail.category && (
            <p className="mt-4 text-sm text-gray-500">
              Category:{" "}
              {typeof productDetail.category === "object"
                ? productDetail.category.name
                : productDetail.category}
            </p>
          )}

          {/* Created Date */}
          <p className="text-xs text-gray-400 mt-1">
            Added on: {new Date(productDetail.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
