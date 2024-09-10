import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cashFundService from "./cashFundService";


export type CashFundType = {
    _id?: string ;
    amount?: number;
    amountAdded?: number;
    amountDeducted?: number;
    userId: {
        _id: string;
        firstName: string;
    };
    comment?: string;
    expenseName?: string,
    dateEntered: string;
}    
   

export type CashFundSliceType = {
    cashFund: CashFundType;
    isErrorCf: boolean;
    isSuccessCf: boolean;
    isLoadingCf: boolean;
    message: string;
} 

export type ExpenseListSliceType = {
    cashFundList: CashFundSliceType[];
    isErrorCf: boolean;
    isSuccessCf: boolean;
    isLoadingCf: boolean;
    message: string;
} 



export const initialCashFundState = {
    cashFundList: [{    
        _id: '',
        amount: 0,
        amountAdded: 0,
        userId: {
            _id: '',
            firstName: '',
        },
        comment: '',
        expenseName: '',
        dateEntered: ''}] as CashFundType[],
    cashFund: {
        _id: '',
        amount: 0,
        amountAdded: 0,
        userId: {
            _id: '',
            firstName: '',
        },
        comment: '',
        expenseId: '',
        dateEntered: ''
    } as CashFundType,
    isErrorCf: false,
    isSuccessCf: false,
    isLoadingCf: false,
    message: ''
}



// Add cash fund
export const addCashFund = createAsyncThunk('cashFund/addCashFund', async(cashFund: CashFundType, thunkAPI )  => {
    try {
        const user = await JSON.parse(localStorage.getItem('user') || '{}')
        cashFund.userId = user._id
        return await cashFundService.addCashFund(cashFund)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

// Deduct from cash fund
export const deductCashFund = createAsyncThunk('cashFund/deductCashFund', async(cashFund: CashFundType, thunkAPI )  => {
    try {
        const user = await JSON.parse(localStorage.getItem('user') || '{}')
        cashFund.userId = user._id
        console.log('cash fund record', cashFund)
        return await cashFundService.deductCashFund(cashFund)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})


/** Get last cash fund doc */
export const getLastCF = createAsyncThunk('cashFund/getLastCF', async(_, thunkAPI) => {
    try {
        const lastDocCF =  await cashFundService.getLastCF()
        return lastDocCF
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

// // Update Expense
// export const updateExpense = createAsyncThunk('expense/updateExpense',  async(expense: ExpenseType, thunkAPI) => {
//     try {
//         return await  expenseService.updateExpense(expense)
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })

// // Delete
// export const deleteExpense = createAsyncThunk('expense/deleteExpense',  async(expenseId: any, thunkAPI) => {
//     try {
//         return await expenseService.deleteExpense(expenseId)
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })

// // get sales list
// export const getExpenseList = createAsyncThunk('expense/getExpenseList', async(_, thunkAPI) => {
//     try {
//         const expenseList =  await expenseService.getExpenseList()
//         return expenseList
        
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })


export const cashFundSlice = createSlice({
    name: 'cashFund',
    initialState: initialCashFundState,
    reducers: {
        resetCashFund: (state) => {
            state.isErrorCf = false
            state.isLoadingCf = false
            state.isSuccessCf = false
            state.message = ''
            state.cashFund = initialCashFundState.cashFund
            state.cashFundList = []
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(addCashFund.pending, (state: CashFundSliceType) => {
                state.isLoadingCf = true
            })
            .addCase(addCashFund.fulfilled, (state: CashFundSliceType) => {
                state.isLoadingCf = false
                state.isSuccessCf = true
                toast.success("Data successfully saved.")
            })
            .addCase(addCashFund.rejected, (state: CashFundSliceType, action: AnyAction) => {
                state.isLoadingCf = false
                state.message = action.payload
                state.isErrorCf = true
                toast.error(state.message)
            })
            .addCase(deductCashFund.pending, (state: CashFundSliceType) => {
                state.isLoadingCf = true
            })
            .addCase(deductCashFund.fulfilled, (state: CashFundSliceType) => {
                state.isLoadingCf = false
                state.isSuccessCf = true
                toast.success("Cash fund was successfully deducted")
            })
            .addCase(deductCashFund.rejected, (state: CashFundSliceType, action: AnyAction) => {
                state.isLoadingCf = false
                state.message = action.payload
                state.isErrorCf = true
                toast.error(state.message)
            })
            .addCase(getLastCF.pending, (state: CashFundSliceType) => {
              state.isLoadingCf = true  
            })
            .addCase(getLastCF.fulfilled, (state: CashFundSliceType, action: AnyAction) => {
                state.isLoadingCf = false
                state.isSuccessCf = true
                state.cashFund = action.payload
            })
            .addCase(getLastCF.rejected, (state: CashFundSliceType, action: AnyAction) => {
                state.isLoadingCf = false
                state.message = action.payload
                state.isErrorCf = true
                toast.error(state.message)
            })
            // .addCase(updateExpense.pending, (state: ExpenseSliceType ) => {
            //     state.isLoadingExp = true
            // })
            // .addCase(updateExpense.fulfilled, (state: ExpenseSliceType, action: AnyAction) => {
            //     state.isLoadingExp = false
            //     state.isSuccessExp = true
            //     state.expense = action.payload
            //     toast.success("Data successfully updated.")
            // })
            // .addCase(updateExpense.rejected, (state: ExpenseSliceType, action: AnyAction) => {
            //     state.isLoadingExp = false
            //     state.message = action.payload
            //     state.isErrorExp = true
            //     toast.error(state.message)
            // })
            // .addCase(deleteExpense.pending, (state ) => {
            //     state.isLoadingExp = true
            // })
            // .addCase(deleteExpense.fulfilled, (state, action: AnyAction) => {
            //     state.isLoadingExp = false
            //     state.isSuccessExp = true
            //     state.expenseList = state.expenseList!.filter((item) => {
            //         return item._id !== action.payload
            //     })
            //     toast.success("Data successfully deleted.")
            // })
            // .addCase(deleteExpense.rejected, (state, action: AnyAction) => {
            //     state.isLoadingExp = false
            //     state.message = action.payload
            //     state.isErrorExp = true
            //     toast.error(state.message)
            // })
            // .addCase(getExpenseList.pending, (state) => {
            //     state.isLoadingExp = true
            // })
            // .addCase(getExpenseList.fulfilled, (state, action) => {
            //     state.isLoadingExp = false
            //     state.isSuccessExp = true
            //     state.expenseList = action.payload
            // })
            // .addCase(getExpenseList.rejected, (state, action: AnyAction) => {
            //     state.isLoadingExp = false
            //     state.message = action.payload
            //     state.isErrorExp = true
            //     toast.error(state.message)
            // })
    },
})


export const {resetCashFund} = cashFundSlice.actions
export default cashFundSlice.reducer