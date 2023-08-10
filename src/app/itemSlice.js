import {createSlice} from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        limit: 6,
        filterValue: "",
    },
    reducers: {
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload;
        }
    },
});

export const {setLimit, setFilterValue} = itemSlice.actions;

export default itemSlice.reducer;