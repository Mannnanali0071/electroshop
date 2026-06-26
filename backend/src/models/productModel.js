import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  richDescription: {
    type: String,
    default: "",
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    url: {
      type: String,
      required: false,
      trim: true,
    },
    alt: {
      type: String,
      required: false,
      trim: true,
    },
    public_id: {
      type: String,
      trim: true
    },
  },
  images: [
    {
      url: {
        type: String,
        required: true,
        trim: true,
      },
      alt: {
        type: String,
        required: false,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true
      },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);
export default Product;
