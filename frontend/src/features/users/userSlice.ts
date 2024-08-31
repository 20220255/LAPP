import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userService from "./userService";
import { toast } from "react-toastify";

export type UserType = {
    _id: string,
    firstName: string,
    lastName?: string,
    email: string,    
}

type UserSliceType = {
    users: UserType[],
    isError: boolean,
    isUserSuccess: boolean,
    isUserLoading: boolean,
    message: string
}

export const initialUserState = {
    users: [{
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
    }] as UserType[],
    isError: false,
    isUserSuccess: false,
    isUserLoading: false,
    message: ''
}

// // Sales input
// export const inputSales = createAsyncThunk('sales/inputSales', async(sales: SalesType, thunkAPI )  => {
//     try {
//         const user = await JSON.parse(localStorage.getItem('user') || '{}')
//         sales.userId = user._id
//         return await salesService.inputSales(sales)
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })

// // Update Sales
// export const updateSales = createAsyncThunk('sales/updateSales',  async(sales: SalesType, thunkAPI) => {
//     try {
//         return await salesService.updateSales(sales)
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })

// // Delete
// export const deleteSales = createAsyncThunk('sales/deleteSales',  async(salesId: any, thunkAPI) => {
//     try {
//         return await salesService.deleteSales(salesId)
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })

// get sales list
export const getAllUsers = createAsyncThunk('user/getAllUser', async(_, thunkAPI) => {
    try {
        const allUsers =  await userService.getAllUsers()
        return allUsers
        
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})


export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {        
        resetUsers: (state) => {
        state.isError = false
        state.isUserLoading = false
        state.isUserSuccess = false
        state.message = ''
        state.users = initialUserState.users
    },},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state: UserSliceType ) => {
                state.isUserLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isUserLoading = false
                state.isUserSuccess = true
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action: AnyAction) => {
                state.isUserLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
    },
})


export const {resetUsers} = userSlice.actions
export default userSlice.reducer