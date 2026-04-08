import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: JSON.parse(localStorage.getItem("cart")) || [],

  },

  reducers: {
    addCart: (state, action) => {
      const item = action.payload;
      const serializableItem = {
        ...item,
        createdAt: item.createdAt?.seconds ? item.createdAt.seconds : item.createdAt,
        updatedAt: item.updatedAt?.seconds ? item.updatedAt.seconds : item.updatedAt,
      };
      const existing = state.carts.find((i) => i.id === serializableItem.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.carts.push({ ...serializableItem, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },

    increaseQty: (state, action) => {
      const item = state.carts.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.carts));
      }
    },

    decreaseQty: (state, action) => {
      const itemId = action.payload;
      const item = state.carts.find((i) => i.id === itemId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.carts = state.carts.filter((i) => i.id !== itemId);
      }

      localStorage.setItem("cart", JSON.stringify(state.carts));
    },

    removeCart: (state, action) => {
      state.carts = state.carts.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },

    clearCart: (state) => {
      state.carts = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addCart,
  increaseQty,
  decreaseQty,
  removeCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;