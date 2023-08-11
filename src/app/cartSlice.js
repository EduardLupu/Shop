import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        total: 0,
        totalQuantity: 0,
        totalProducts: 0,
    },
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        setTotalQuantity: (state, action) => {
            state.totalQuantity = action.payload;
        },
        setTotalProducts: (state, action) => {
            state.totalProducts = action.payload;
        }
    },
});

export const { setTotal, setTotalQuantity, setTotalProducts } = cartSlice.actions;
export default cartSlice.reducer;
