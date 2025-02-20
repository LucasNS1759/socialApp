import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkIsLoggedIn } from "../../../services/auth/checkLogin"

const initialState = {
    isLoggedIn: false,
    user: null,
    isLoading: false,
    error: null,
};

export const fetchLoginStatus = createAsyncThunk("user/fetchLoginStatus", async (_, { rejectWithValue }) => {
    //retorna o true o false 
    try {
        const response = await checkIsLoggedIn();
        return response?.data?.success || false
    } catch (error) {

        return rejectWithValue(error)
    }

})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload;
            state.user = action.payload || null;
            state.error = null
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginStatus.pending, (state) => {
                // Acción cuando el thunk está "pendiente"
                state.isLoading = true; // Podés usar esto para un spinner, por ejemplo
                state.error = null;    // Limpiás errores previos
            })
            .addCase(fetchLoginStatus.fulfilled, (state, action) => {
                // Acción cuando el thunk se resuelve con éxito
                state.isLoading = false;         // Ya terminó de cargar
                state.isLoggedIn = action.payload; // Actualizás si está logueado
            })
            .addCase(fetchLoginStatus.rejected, (state, action) => {
            
                // Acción cuando el thunk falla
                state.isLoading = false;        // Terminó de cargar
                state.isLoggedIn = false;       // Asumís que no está logueado
                state.error = action.payload;     // Guardás el error para mostrar
            });
    }
});


export const { logOut, login } = userSlice.actions;
export default userSlice.reducer;

//SELECTORES 

export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUser = (state) => state.user.user;