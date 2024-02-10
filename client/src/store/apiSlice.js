import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserContextProvider } from '../context/userContext';

const baseUrl = 'https://gui-hack4good-api.onrender.com/';
//const baseUrl = 'http://localhost:8000';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getActivity: builder.query({
            query: (arg) => {
                return {
                    url: '/tracker',
                    method: 'GET',
                    params: { ...arg },
                };
            },
            providesTags: ['Activities'],
        }),
        getUser: builder.query({
            query: () => '/profile',
        }),
        addActivity: builder.mutation({
            query: (activity) => ({
                url: '/tracker',
                method: 'POST',
                body: activity,
            }),
            invalidatesTags: ['Activities'],
        }),
        deleteTransaction: builder.mutation({
            query: (recordId) => ({
                url: '/tracker',
                method: 'DELETE',
                body: recordId,
            }),
            invalidatesTags: ['Activities'],
        }),
    }),
});

export default apiSlice;
