import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice"
import cartReducer from "./cartSlice"

export const store = configureStore({
    reducer: {
        orders: orderReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
})