import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("cartData")|| "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cartData", JSON.stringify(cart)|| "[]");
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((p) => p._id === item._id);

      if (existing) {
        existing.qty += 1; // increase quantity
      } else {
        state.items.push({ ...item, qty: 1 });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const product = state.items.find((p) => p._id === id);
      if (product) {
        product.qty = qty;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
