import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        total: 0,
        totalQuantity: 0,
    },
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        setTotalQuantity: (state, action) => {
            state.totalQuantity = action.payload;
        },
    },
});

export const { setTotal, setTotalQuantity } = cartSlice.actions;
export default cartSlice.reducer;
