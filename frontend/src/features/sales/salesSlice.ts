import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import salesService from "./salesService";
import { toast } from "react-toastify";

export type SalesType = {
    _id?: string,
    firstName: string,
    lastName?: string,
    w1: boolean;
    w2: boolean;
    w3: boolean;
    w4: boolean;
    w5: boolean;
    d1: boolean;
    d2: boolean;
    d3: boolean;
    d4: boolean;
    d5: boolean;
    detergent: {
        name: string;
        count: number;
    };
    fabCon: {
        name: string;
        count: number;
    }
    extraDry: number;
    folds: number;
    foldsShare: number;
    spinDry: number;
    totalSales: number;
    userId: {
        _id: string;
        firstName: string;
    };
    createdAt?: string;
    dateEntered?: string;
    comment: string;
}    
// export type SalesListType = {
//     _id?: string;
//     firstName: string;
//     lastName?: string,
//     w1: boolean;
//     w2: boolean;
//     w3: boolean;
//     w4: boolean;
//     w5: boolean;
//     d1: boolean;
//     d2: boolean;
//     d3: boolean;
//     d4: boolean;
//     d5: boolean;
//     detergent: {
//         name: string;
//         count: number;
//     };
//     fabCon: {
//         name: string;
//         count: number;
//     }
//     extraDry: number;
//     folds: number;
//     foldsShare: number;
//     spinDry: number;
//     totalSales: number;
//     userId: {
//         _id: string;
//         firstName: string;
//     };
//     createdAt?: string;
//     dateEntered?: string;
//     comment: string;
// }    

export type SalesSliceType = {
    sales: SalesType;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    salesList: SalesType[]
} 

// export type SalesListSliceType = {
//     salesList: SalesType[];
//     isError: boolean;
//     isSuccess: boolean;
//     isLoading: boolean;
//     message: string
// } 



export const initialState = {
    salesList: [{
        _id: '',
        firstName: '',
        lastName: '',
        w1: false,
        w2: false,
        w3: false,
        w4: false,
        w5: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        detergent: {
            name: '',
            count: 0,
        },
        fabCon: {
            name: '',
            count: 0,
        },
        extraDry: 0,
        folds: 0,
        spinDry: 0,
        totalSales: 0,
        userId: {
            _id: '',
            firstName: ''
        },
        createdAt: '',
        dateEntered: '',
        comment: '',
    }] as SalesType[],
    sales: {} as SalesType,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Sales input
export const inputSales = createAsyncThunk('sales/inputSales', async(sales: SalesType, thunkAPI )  => {
    try {
        const user = await JSON.parse(localStorage.getItem('user') || '{}')
        sales.userId = user._id
        return await salesService.inputSales(sales)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

// Update Sales
export const updateSales = createAsyncThunk('sales/updateSales',  async(sales: SalesType, thunkAPI) => {
    try {
        return await salesService.updateSales(sales)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

// Delete
export const deleteSales = createAsyncThunk('sales/deleteSales',  async(salesId: any, thunkAPI) => {
    try {
        return await salesService.deleteSales(salesId)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

// get sales list
export const getSalesList = createAsyncThunk('sales/getSalesList', async(_, thunkAPI) => {
    try {
        const salesList =  await salesService.getSalesList()
        return salesList
        
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})


export const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        resetSales: (state: SalesSliceType) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
            state.sales = initialState.sales
            state.salesList = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(inputSales.pending, (state: SalesSliceType ) => {
                state.isLoading = true
            })
            .addCase(inputSales.fulfilled, (state: SalesSliceType) => {
                state.isLoading = false
                state.isSuccess = true
                toast.success("Data successfully saved.")
            })
            .addCase(inputSales.rejected, (state: SalesSliceType, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
            .addCase(updateSales.pending, (state: SalesSliceType ) => {
                state.isLoading = true
            })
            .addCase(updateSales.fulfilled, (state: SalesSliceType, action: AnyAction) => {
                state.isLoading = false
                state.isSuccess = true
                state.sales = action.payload
                toast.success("Data successfully updated.")
            })
            .addCase(updateSales.rejected, (state: SalesSliceType, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
            .addCase(deleteSales.pending, (state ) => {
                state.isLoading = true
            })
            .addCase(deleteSales.fulfilled, (state, action: AnyAction) => {
                state.isLoading = false
                state.isSuccess = true
                state.salesList = state.salesList.filter((item) => {
                    return item._id !== action.payload
                })
                toast.success("Data successfully deleted.")
            })
            .addCase(deleteSales.rejected, (state, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
            .addCase(getSalesList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSalesList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.salesList = action.payload
            })
            .addCase(getSalesList.rejected, (state, action: AnyAction) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                toast.error(state.message)
            })
    },
})


export const {resetSales} = salesSlice.actions
export default salesSlice.reducer