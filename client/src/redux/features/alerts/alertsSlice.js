import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    type: "",
    text: "",
    isVisible: false
}


const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        alert: (state, action) => {
            state.type = action.payload.type;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.isVisible = true
        },
        hideAlert: (state) => {
            state.isVisible = false;
            state.text = "";
            state.title = "";
            state.type = ""
        }
    }
})

export const { alert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;