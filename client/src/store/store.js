import { configureStore } from '@reduxjs/toolkit';
import activitySlice from './reducer';
import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        activity: activitySlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
