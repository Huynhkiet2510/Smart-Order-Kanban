import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        isLoading: false,
        searchQuery: "",
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        addOrder: (state, action) => {
            const newOrder = { ...action.payload, columnId: 1, createdAt: new Date().toISOString() };
            state.orders.unshift(newOrder);
        },
        updateOrderStatus: (state, action) => {
            const { id, newColumnId } = action.payload;
            const existingOrder = state.orders.find(o => o.id === id);
            if (existingOrder) {
                existingOrder.columnId = newColumnId;
            }
        },
        updateOrderInfo: (state, action) => {
            const index = state.orders.findIndex(o => o.id === action.payload.id);
            if (index !== -1) {
                state.orders[index] = { ...state.orders[index], ...action.payload };
            }
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter(o => o.id !== action.payload);
        }
    }
});

export const { setOrders, setSearchQuery, addOrder, updateOrderStatus, updateOrderInfo, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;