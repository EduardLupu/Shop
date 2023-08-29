import {createSlice} from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        limit: 6,
        searchValue: "",
        category: "",
        offset: 0,
    },
    reducers: {
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
});

export const {setLimit, setSearchValue, setOffset, setCategory} = itemSlice.actions;

export default itemSlice.reducer;