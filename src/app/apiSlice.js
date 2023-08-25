import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => {
                return `/products?limit=${params.limit}&skip=${params.skip}`
            },
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            merge(currentCache, newItems) {
                currentCache.push(...newItems);
            },
            forceRefetch({currentArg, previousArg}) {
                if (previousArg !== undefined) {
                    return currentArg.skip !== previousArg.skip;
                }
                return false;
            }
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`,
        }),
        addProductToCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        removeProductFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
        }),
        deleteProductFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/delete/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        initCartProducts: builder.query({
            query: () => {
                return {
                    url: `/cart`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            },
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        profile: builder.query({
            query: () => ({
                url: '/account',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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
    useProfileQuery,
    useRegisterMutation,
    useLogoutMutation,
} = apiSlice;