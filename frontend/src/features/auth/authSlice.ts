import { Action, AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserLoginType } from "../../pages/Login"
import authService from "./authService"
import { UserType } from "../../pages/Register"

// get user from local storage
export const user = JSON.parse(localStorage.getItem('user') || '{}')

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', async (user: UserType, thunkAPI) => {
try {
    console.log('authslice register - ', user)
    return await authService.register(user)
} catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    const thunkMessage = thunkAPI.rejectWithValue(message)
    console.log('error - ', thunkMessage)
    return thunkMessage
}
})

// Login user
export const login = createAsyncThunk('auth/login', async (user: UserLoginType, thunkAPI) => {
try {
    return await authService.login(user)
} catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    const thunkMessage = thunkAPI.rejectWithValue(message)
    console.log('error - ', thunkMessage)
    return thunkMessage
}
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        },
        logout: (state) => {
            state.user =null
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.user = null
                state.isError = true
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action: AnyAction) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    },
})

export const {reset, logout} = authSlice.actions
export default authSlice.reducer