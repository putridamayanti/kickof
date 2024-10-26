import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: 'Admin Storyrow',
    email: 'admin@storyrow.io',
    role: {
        id: '1234',
        code: 'admin',
        name: 'Admin'
    }
};

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
    }
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;