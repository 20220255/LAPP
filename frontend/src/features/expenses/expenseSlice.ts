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
    }] as ExpenseType[],
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

// Update Expense
export const updateExpense = createAsyncThunk('expense/updateExpense',  async(expense: ExpenseType, thunkAPI) => {
    try {
        return await  expenseService.updateExpense(expense)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

// Delete
export const deleteExpense = createAsyncThunk('expense/deleteExpense',  async(expenseId: any, thunkAPI) => {
    try {
        return await expenseService.deleteExpense(expenseId)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

// get sales list
export const getExpenseList = createAsyncThunk('expense/getExpenseList', async(_, thunkAPI) => {
    try {
        const expenseList =  await expenseService.getExpenseList()
        return expenseList
        
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})


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
            state.expenseList = []
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
            .addCase(updateExpense.pending, (state: ExpenseSliceType ) => {
                state.isLoading = true
            })
            .addCase(updateExpense.fulfilled, (state: ExpenseSliceType, action: AnyAction) => {
                state.isLoading = false
                state.isSuccess = true
                state.expense = action.payload
                toast.success("Data successfully updated.")
            })
            .addCase(updateExpense.rejected, (state: ExpenseSliceType, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
            .addCase(deleteExpense.pending, (state ) => {
                state.isLoading = true
            })
            .addCase(deleteExpense.fulfilled, (state, action: AnyAction) => {
                state.isLoading = false
                state.isSuccess = true
                state.expenseList = state.expenseList!.filter((item) => {
                    return item._id !== action.payload
                })
                toast.success("Data successfully deleted.")
            })
            .addCase(deleteExpense.rejected, (state, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
            .addCase(getExpenseList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getExpenseList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.expenseList = action.payload
            })
            .addCase(getExpenseList.rejected, (state, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
    },
})


export const {resetExpense} = expenseSlice.actions
export default expenseSlice.reducer