import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import cartReducer from './cartSlice';
export default configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer,
    },
});