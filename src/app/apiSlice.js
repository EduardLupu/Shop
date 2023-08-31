import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
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
            invalidatesTags: ['Order']
        }),
        removeProductFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ['Order']
        }),
        deleteProductFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/delete/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Order']
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
            providesTags: ['Cart', 'Order'],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            }),
            invalidatesTags: ['User', 'Cart'],
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            }),
            invalidatesTags: ['User', 'Cart'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['User', 'Cart', 'Orders'],
        }),
        profile: builder.query({
            query: () => ({
                url: '/account',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['User'],
        }),
        reviews: builder.query({
            query: (productId) => ({
                url: `/reviews/${productId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            providesTags: ['Reviews'],
        }),
        createReview: builder.mutation({
            query: (params) => ({
                url: `/reviews/${params.productId}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params.review),
            }),
            invalidatesTags: ['Reviews'],
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/categories',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
        }),
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: `/products/category/${category}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
        }),
        getProductsBySearch: builder.query({
            query: (searchValue) => ({
                url: `/products/search/${searchValue}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
        }),
        createOrder: builder.mutation({
            query: (params) => {
                console.log(params);
                return {
                    url: `/orders`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params.order),
                }
            },
            invalidatesTags: ['Orders'],
        }),
        getOrders: builder.query({
            query: () => ({
                url: `/orders`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            providesTags: ['Orders'],
        }),
        deleteReview: builder.mutation({
            query: (params) => ({
                url: `/reviews/${params.ratingId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ['Reviews'],
        }),
        emptyCart: builder.mutation({
            query: () => ({
                url: `/cart`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidateTags: ['Cart', 'Order'],
        }),
        createReturn: builder.mutation({
            query: (params) => ({
                url: `/return`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }),
            invalidatesTags: ['Orders', 'Returns'],
        }),
        deliverOrder: builder.mutation({
            query: (params) => ({
                url: `/orders/${params.orderId}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ['Orders', 'Returns'],
        }),
        getReturns: builder.query({
            query: () => ({
                url: `/return`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            providesTags: ['Returns'],
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
    useReviewsQuery,
    useCreateReviewMutation,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetProductsBySearchQuery,
    useCreateOrderMutation,
    useGetOrdersQuery,
    useDeleteReviewMutation,
    useEmptyCartMutation,
    useCreateReturnMutation,
    useDeliverOrderMutation,
    useGetReturnsQuery,
} = apiSlice;