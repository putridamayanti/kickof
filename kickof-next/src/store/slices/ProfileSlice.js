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
        setProfile: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
    }
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;