import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Category', 'Products', 'Brand', 'Basket'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                method: 'POST',
                url: 'auth/signin',
                body: { email, password }
            })
        }),

        register: builder.mutation({
            query: ({ firstName, lastName, password, email, dateOfBirth, gender }) => ({
                method: 'POST',
                url: 'auth/signup',
                body: { firstName, lastName, password, email, dateOfBirth, gender }
            })
        }),

        //Category
        addCategory: builder.mutation({
            query: ({ name, slug, parentId = null }) => ({
                method: 'post',
                url: 'category',
                body: { name, slug, parentId }
            }),
            invalidatesTags: ['Category']
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                method: 'delete',
                url: `category/${id}`,
            }),
            invalidatesTags: ['Category']
        }),

        editCategory: builder.mutation({
            query: ({ params, id }) => ({
                method: 'post',
                url: `category/${id}`,
                body: params
            }),
            invalidatesTags: ['Category']
        }),

        getAllCategories: builder.query({
            query: () => 'category',
            providesTags: ['Category']
        }),

        //Brand
        addBrand: builder.mutation({
            query: ({ name, slug }) => ({
                method: 'post',
                url: 'brand',
                body: { name, slug }
            }),
            invalidatesTags: ['Brand']
        }),

        deleteBrand: builder.mutation({
            query: (id) => ({
                method: 'delete',
                url: `brand/${id}`,
            }),
            invalidatesTags: ['Brand'],
        }),

        editBrand: builder.mutation({
            query: ({ params, id }) => ({
                method: 'post',
                url: `brand/${id}`,
                body: params,
            }),
            invalidatesTags: ['Brand'],
        }),

        getAllBrands: builder.query({
            query: () => 'brand',
            providesTags: ['Brand'],
        }),

        //Products
        uploadImage: builder.mutation({
            query: (formData) => ({
                method: 'POST',
                url: 'upload/image',
                body: formData,
            })
        }),

        addProduct: builder.mutation({
            query: (productData) => ({
                method: 'POST',
                url: 'product',
                body: productData,
            }),
            invalidatesTags: ['Products']
        }),

        editProduct: builder.mutation({
            query: ({ params, id }) => ({
                method: 'PUT',
                url: `product/${id}`,
                body: params,
            }),
            invalidatesTags: ['Products']
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `product/${id}`,
            }),
            invalidatesTags: ['Products']
        }),
        getProduct: builder.query({
            query: () => 'product/all',
            providesTags: ['Products']
        }),

        // getProduct: builder.query({
        //     query: (params = {}) => {
        //         const searchParams = new URLSearchParams();
        //         Object.keys(params).forEach(key => {
        //             if (params[key] !== undefined && params[key] !== '') {
        //                 searchParams.append(key, params[key]);
        //             }
        //         });
        //         return `product?${searchParams.toString()}`;
        //     },
        //     providesTags: ['Products']
        // }),
        getFilteredProducts: builder.query({
            query: (filters = {}) => {
                const params = new URLSearchParams();
                
                if (filters.brandId) params.append('brandId', filters.brandId);
                if (filters.colors && filters.colors.length > 0) {
                    filters.colors.forEach(color => params.append('colors', color));
                }
                if (filters.sizes && filters.sizes.length > 0) {
                    filters.sizes.forEach(size => params.append('sizes', size));
                }
                if (filters.minPrice) params.append('minPrice', filters.minPrice);
                if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
                
                return `product/filter?${params.toString()}`;
            },
            providesTags: ['Products']
        }),
        getProductById: builder.query({
            query: (id) => `product/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }]
        }),
        // Basket/Cart endpoints 
        getBasket: builder.query({
            query: () => 'basket',
            providesTags: ['Basket']
        }),

        addToBasket: builder.mutation({
            query: ({ productId, quantity, color, size }) => ({
                method: 'POST',
                url: `basket/${productId}`, 
                body: { 
                    color,    
                    size,       
                    quantity 
                }
            }),
            invalidatesTags: ['Basket']
        }),

        updateBasketItem: builder.mutation({
            query: ({ productId, quantity, color, size }) => ({
                method: 'POST', 
                url: `basket/${productId}`,
                body: { 
                    color, 
                    size, 
                    quantity 
                }
            }),
            invalidatesTags: ['Basket']
        }),

        removeFromBasket: builder.mutation({
            query: (productId) => ({
                method: 'DELETE',
                url: `basket/${productId}`,
            }),
            invalidatesTags: ['Basket']
        }),

        clearBasket: builder.mutation({
            query: () => ({
                method: 'DELETE',
                url: 'basket',
            }),
            invalidatesTags: ['Basket']
        }),

    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useAddCategoryMutation,
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
    useEditCategoryMutation,
    useGetFilteredProductsQuery,
    useGetProductQuery,
    useUploadImageMutation,
    useAddProductMutation,
    useDeleteProductMutation,
    useEditProductMutation,
    useGetProductByIdQuery,
    useGetAllBrandsQuery,
    useDeleteBrandMutation,
    useEditBrandMutation,
    useAddBrandMutation,

    useGetBasketQuery,
    useAddToBasketMutation,
    useUpdateBasketItemMutation,
    useRemoveFromBasketMutation,
    useClearBasketMutation,
} = API