import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ProductApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['products'],

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'products', id })), 'products']
          : ['products'],
    }),

    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'products' }],
    }),

    addProducts: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'products' }],
    }),

    updateProducts: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'products' }],
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useDeleteProductsMutation,
  useAddProductsMutation,
  useUpdateProductsMutation, 
} = ProductApi
