import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    isSidebarCollapsed: false,
    sidebarWidth: 180,
    sidebarIconWidth: 35,
    sidebarIconSize: '1rem',
    sidebarCircleIconSize: '0.525rem',
    groupActive: [],
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setSidebarCollapse: (state, action) => {
            state.isSidebarCollapsed = action.payload;
        },
        addGroupActive: (state, action) => {
            state.groupActive = [...state.groupActive, action.payload];
        },
        removeGroupActive: (state, action) => {
            state.groupActive = state.groupActive.filter(e => e !== action.payload);
        }
    }
});

export const ThemeActions = ThemeSlice.actions;
export default ThemeSlice;