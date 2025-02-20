import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/user/userSlice"
import alertReducer from "./features/alerts/alertsSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        alert : alertReducer
    }

})


export default store