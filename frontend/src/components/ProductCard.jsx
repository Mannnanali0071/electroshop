import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product)); // Redux handles state + localStorage
  };
  return (
    <Link to={`/product/${product._id}`} className="block w-full max-w-[200px] mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.03] flex flex-col overflow-hidden w-full">

        {/* Product Image */}
        <div className="w-full h-40 flex items-center justify-center bg-gray-50">
          <img
            src={product.image?.url || product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="p-2 flex flex-col flex-1">
          <h3 className="text-gray-900 font-medium text-xs sm:text-sm truncate">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-gray-500 text-xs mt-0.5 truncate">
              {product.brand}
            </p>
          )}
          <p className="text-black font-semibold text-xs sm:text-sm mt-1">
            ₹ {product.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Add to Cart */}
        <div className="p-2">
          <button
            onClick={handleAddToCart}
            className="w-full py-1.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition text-xs sm:text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
