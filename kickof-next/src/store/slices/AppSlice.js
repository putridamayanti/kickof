import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    country: {},
    workspace: {},
    workspaces: [],
    project: {},
    projects: [],
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
            state.workspaces = action.payload;
        },
        setProject: (state, action) => {
            state.project = action.payload;
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        }
    }
});

export const AppActions = AppSlice.actions;
export default AppSlice;