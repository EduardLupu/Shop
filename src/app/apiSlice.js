import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_INTERNAL_CART_ID = '64c3aa50d27ba';
const API_INTERNAL_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`;
const API_GET_PRODUCTS_URL = 'https://dummyjson.com/products';
const token = localStorage.getItem('user-token');

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => {
                console.log(params)
                return `${API_GET_PRODUCTS_URL}?limit=${params.limit}&skip=${params.skip}`
            },
        }),
        getProduct: builder.query({
            query: (id) => `${API_GET_PRODUCTS_URL}/${id}`,
        }),
        addProductToCart: builder.mutation({
            query: ({ productID, quantity }) => ({
                url: `https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': token,
                },
                body: JSON.stringify({
                    userId: 1,
                    products: [{ id: productID, quantity }],
                }),
            }),
        }),
        removeProductFromCart: builder.mutation({
            query: ({ productID, quantity }) => ({
                url: `https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': token,
                },
                body: JSON.stringify({
                    userId: 1,
                    products: [{ id: productID, quantity }],
                }),
            }),
        }),
        deleteProductFromCart: builder.mutation({
            query: (productID) => ({
                url: `https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}?products[]=${productID}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': token,
                },
            }),
        }),
        initCartProducts: builder.query({
            query: async () => {
                let cartProducts;
                if (localStorage.getItem('cart') === null) {
                    const response = await fetch(API_INTERNAL_CART_GET, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Internship-Auth': token,
                        },
                    });
                    if (response.status !== 200) {
                        return null;
                    }
                    cartProducts = await response.json();
                    localStorage.setItem('cart', JSON.stringify(cartProducts));
                } else {
                    cartProducts = JSON.parse(localStorage.getItem('cart'));
                }
                return cartProducts;
            },
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductToCartMutation,
    useRemoveProductFromCartMutation,
    useDeleteProductFromCartMutation,
    useInitCartProductsQuery,
    useLoginMutation,
} = apiSlice;