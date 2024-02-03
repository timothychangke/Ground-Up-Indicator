import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activity: [],
};

export const activitySlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        getActivity: (state) => {},
    },
});

export const { getActivity } = activitySlice.actions;
export default activitySlice.reducer;
