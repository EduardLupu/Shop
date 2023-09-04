import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import cartReducer from './cartSlice';
import itemReducer from './itemSlice';
import {apiSlice} from './apiSlice';
export default configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer,
        item: itemReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});