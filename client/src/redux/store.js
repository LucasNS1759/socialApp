import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/user/userSlice"
import alertReducer from "./features/alerts/alertsSlice"
import postReducer from "./features/posts/postSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        alert : alertReducer,
        post : postReducer
    }

})


export default store