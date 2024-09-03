import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import expenseService from "./expenseService";
import { toast } from "react-toastify";

export type ExpenseType = {
    _id?: string | undefined | '';
    name: string | undefined;
    amount: number;
    type: string;
    userId?: {
        _id: string;
        firstName: string;
    };
    comment: string;
    dateEntered?: string;
}    
   

export type ExpenseSliceType = {
    expense: ExpenseType;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
} 

export type ExpenseListSliceType = {
    expenseList: ExpenseSliceType[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
} 



export const initialExpenseState = {
    expenseList: [{
        _id: '',
        name: '',
        amount: 0,
        type: '',
        userId: {
            _id: '',
            firstName: '',
        },
        comment: '',
        dateEntered: '',
    }] as ExpenseType[] | null,
    expense: {} as ExpenseType,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Expense input
export const inputExpense = createAsyncThunk('expense/inputExpense', async(expense: ExpenseType, thunkAPI )  => {
    try {
        const user = await JSON.parse(localStorage.getItem('user') || '{}')
        expense.userId = user._id
        return await expenseService.inputExpense(expense)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

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

// // get sales list
// export const getSalesList = createAsyncThunk('sales/getSalesList', async(_, thunkAPI) => {
//     try {
//         const salesList =  await salesService.getSalesList()
//         return salesList
        
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })


export const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        resetExpense: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
            state.expense = initialExpenseState.expense
            state.expenseList = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase( inputExpense.pending, (state: ExpenseSliceType) => {
                state.isLoading = true
            })
            .addCase(inputExpense.fulfilled, (state: ExpenseSliceType) => {
                state.isLoading = false
                state.isSuccess = true
                toast.success("Data successfully saved.")
            })
            .addCase(inputExpense.rejected, (state: ExpenseSliceType, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
            // .addCase(updateSales.pending, (state: SalesSliceType ) => {
            //     state.isLoading = true
            // })
            // .addCase(updateSales.fulfilled, (state: SalesSliceType, action: AnyAction) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.sales = action.payload
            //     toast.success("Data successfully updated.")
            // })
            // .addCase(updateSales.rejected, (state: SalesSliceType, action: AnyAction) => {
            //     state.isLoading = false
            //     state.message = action.payload
            //     state.isError = true
            //     toast.error(state.message)
            // })
            // .addCase(deleteSales.pending, (state ) => {
            //     state.isLoading = true
            // })
            // .addCase(deleteSales.fulfilled, (state, action: AnyAction) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.salesList = state.salesList.filter((item) => {
            //         return item._id !== action.payload
            //     })
            //     toast.success("Data successfully deleted.")
            // })
            // .addCase(deleteSales.rejected, (state, action: AnyAction) => {
            //     state.isLoading = false
            //     state.message = action.payload
            //     state.isError = true
            //     toast.error(state.message)
            // })
            // .addCase(getSalesList.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(getSalesList.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.salesList = action.payload
            // })
            // .addCase(getSalesList.rejected, (state, action: AnyAction) => {
            //     state.isLoading = false
            //     state.message = action.payload
            //     state.isError = true
            //     toast.error(state.message)
            // })
    },
})


export const {resetExpense} = expenseSlice.actions
export default expenseSlice.reducer