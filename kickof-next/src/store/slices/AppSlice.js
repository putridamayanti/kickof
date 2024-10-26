import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    country: {},
    workspace: {},
    workspaces: [],
    project: {}
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setWorkspace: (state, action) => {
            state.workspace = action.payload;
        },
        setWorkspaces: (state, action) => {
            console.log(action.payload)
            state.workspaces = action.payload;
        },
        setProject: (state, action) => {
            state.project = action.payload;
        },
    }
});

export const AppActions = AppSlice.actions;
export default AppSlice;