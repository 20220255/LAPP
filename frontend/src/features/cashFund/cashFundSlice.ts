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

export type CashFundListSliceType = {
    cashFundList: CashFundType[];
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

/** Get last 20 cash fund doc */
export const getLast20CF = createAsyncThunk('cashFund/getLast20CF', async(_, thunkAPI) => {
    try {
        const last20DocCF =  await cashFundService.getLast20CF()
        return last20DocCF
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})


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
            .addCase(getLast20CF.pending, (state: CashFundListSliceType) => {
              state.isLoadingCf = true  
            })
            .addCase(getLast20CF.fulfilled, (state: CashFundListSliceType, action) => {
                state.isLoadingCf = false
                state.isSuccessCf = true
                state.cashFundList = action.payload
            })
            .addCase(getLast20CF.rejected, (state: CashFundListSliceType, action: AnyAction) => {
                state.isLoadingCf = false
                state.message = action.payload
                state.isErrorCf = true
                toast.error(state.message)
            })
    },
})


export const {resetCashFund} = cashFundSlice.actions
export default cashFundSlice.reducer