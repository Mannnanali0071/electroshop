import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }
}, { timestamps: true })

const OrderItem = mongoose.model('OrderItem', OrderItemSchema)
export default OrderItem