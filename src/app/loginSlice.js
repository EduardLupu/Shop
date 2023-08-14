import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        userToken: '',
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        }
    },
});

export const { setIsLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
