import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { successMSG } from "../../utils/msg";

// Loader Skeleton
function Loader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="w-full h-64 bg-gray-800 rounded-lg"></div>
      <div className="h-6 bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
    </div>
  );
}

// Image Gallery Component
function ImageGallery({ images, mainImage, setMainImage }) {
  return (
    <div className="lg:w-1/2 flex flex-col gap-4 mb-8 lg:mb-0">
      {/* Main Image */}
      <div className="flex-1">
        <img
          src={mainImage || "/placeholder.png"}
          alt="Main product"
          className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-contain rounded-xl shadow-lg border border-gray-800"
        />
      </div>

      {/* Thumbnails */}
      {images?.length > 0 && (
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pt-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.alt || `product-${idx}`}
              onClick={() => setMainImage(img.url)}
              className={`h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-lg border-2 cursor-pointer transition ${mainImage === img.url
                ? "border-purple-600"
                : "border-gray-700 hover:border-purple-400"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Confirm Delete Modal
function ConfirmModal({ open, onClose, onConfirm, deleting }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-xl w-[90%] sm:w-[400px]">
        <h2 className="text-lg font-semibold text-white mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-red-700 text-white font-medium hover:from-rose-700 hover:to-red-800 transition disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Admin Product Detail Page
export default function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://electroshop-334x.onrender.com/api/products/${id}`);
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token")
    try {
      setDeleting(true);
      const res = await fetch(`http://electroshop-334x.onrender.com/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token,
        }
      });
      if (!res.ok) throw new Error("Failed to delete product");

      successMSG("Product deleted successfully!");

      // Redirect back (index -1)
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  if (loading)
    return (
      <div className="p-6">
        <Loader />
      </div>
    );
  if (error) return <div className="p-6 text-red-400">⚠ {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-[#121212] min-h-screen text-gray-200">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* Left side: Image gallery */}
        <ImageGallery
          images={productDetail.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />

        {/* Right side: Product Info for Admin */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 break-words">
            {productDetail.name}
          </h1>
          {productDetail.brand && (
            <p className="text-sm text-gray-400 mb-4">
              Brand:{" "}
              <span className="font-medium text-gray-200">
                {productDetail.brand}
              </span>
            </p>
          )}

          <p className="text-xl sm:text-2xl font-bold text-purple-400 mb-4">
            ₹{productDetail.price.toLocaleString("en-IN")}
          </p>

          <p
            className={`mb-6 font-medium ${productDetail.stock > 0 ? "text-green-400" : "text-red-400"
              }`}
          >
            {productDetail.stock > 0
              ? `In Stock (${productDetail.stock} available)`
              : "Out of Stock"}
          </p>

          <p className="text-gray-300 mb-4 break-words">
            {productDetail.description}
          </p>

          {productDetail.richDescription && (
            <p className="text-gray-400 mb-6 leading-relaxed break-words">
              {productDetail.richDescription}
            </p>
          )}

          {/* Admin Data */}
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-gray-400">Category:</span>{" "}
              <span className="text-gray-200">
                {typeof productDetail.category === "object"
                  ? productDetail.category.name
                  : productDetail.category}
              </span>
            </p>
            <p>
              <span className="text-gray-400">Product ID:</span>{" "}
              <span className="text-gray-500">{productDetail._id}</span>
            </p>
            <p className="text-xs text-gray-500">
              Created: {new Date(productDetail.createdAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Updated: {new Date(productDetail.updatedAt).toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap mt-6">
            <Link
              to={`/admin/products/edit/${productDetail._id}`}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow hover:from-indigo-600 hover:to-purple-700 transition text-sm sm:text-base"
            >
              <FaEdit /> Edit Product
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-red-700 text-white font-medium shadow hover:from-rose-700 hover:to-red-800 transition text-sm sm:text-base"
            >
              <FaTrash /> Delete Product
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </div>
  );
}
