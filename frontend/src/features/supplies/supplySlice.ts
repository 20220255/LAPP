import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SupplySliceType, SupplyType } from "./supplyTypes";
import supplyService from "./supplyService";

const initialSupplyState = {
    supplyList: [{    
        supplyName: '',
        type: '',
        count: 0,
        countAdded: 0,
        countDeducted: 0,
        customerName: '',
        comment: '',
        
    }] as SupplyType[],
    supply: {
        supplyName: '',
        type: '',
        count: 0,
        countAdded: 0,
        countDeducted: 0,
        customerName: '',
        comment: '',
    } as SupplyType,
    isErrorSupply: false,
    isSuccessSupply: false,
    isLoadingSupply: false,
    messageSupply: ''
} as SupplySliceType

const initialSupply = {
    supplyName: '',
    count: 0,
    countDeducted: 0,
    customerName: '',
    createdAt: '',
    userId: {firstName: '', _id: ''},
    type: '',
}

/** Add Supplies */
export const addSupply = createAsyncThunk('supply/addSupply', async(supply: SupplyType, thunkAPI )  => {
    try {

        supply = {...supply, createdAt: '', _id: '', countDeducted: null, dateEntered: '', image: ''}
        
        const user = await JSON.parse(localStorage.getItem('user') || '{}')
        
        supply.userId = user._id
        
        return await supplyService.addSupplies(supply)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})

/** Deduct supplies */
export const deductSupply = createAsyncThunk('supply/deductSupply', async(supplyListDetergentCount: { supplyList: SupplyType[], name: string, count: number, customerName: string } , thunkAPI )  => {
    try {

        const supply = initialSupply

        /** Get the supplyName and the count deducted and Supply List*/
        const { supplyList, name, count, customerName } = supplyListDetergentCount        
        
        /** Filter the supply list based on the supply name */
        const filteredSupply = supplyList.filter((item) => item.supplyName === name) 
        
        /** Get the latest createdAt and get Total Count */
        const latestSupply = filteredSupply.reduce((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
        }) 
        
        /** Subtract the total count from count deducted */
        const countDeducted = latestSupply.count - count
        
        /** Update the supplyList with the new total count and countDeducted*/
        const supplyDeducted = { ...supply, supplyName: name, count: countDeducted, countDeducted: count, customerName}
        
        const user = await JSON.parse(localStorage.getItem('user') || '{}')
        supplyDeducted.userId._id = user._id

        return await supplyService.deductSupplies(supplyDeducted)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})


// /** Get last cash fund doc */
// export const getLastCF = createAsyncThunk('cashFund/getLastCF', async(_, thunkAPI) => {
//     try {
//         const lastDocCF =  await cashFundService.getLastCF()
//         return lastDocCF
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         const thunkMessage = thunkAPI.rejectWithValue(message)
//         return thunkMessage
//     }
// })

/** Get all supplies trasanction */
export const getAllSupplies = createAsyncThunk('supply/getAllSupplies', async(_, thunkAPI) => {
    try {
        const allSupplies =  await supplyService.getAllSupplies()
        return allSupplies
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const thunkMessage = thunkAPI.rejectWithValue(message)
        return thunkMessage
    }
})


export const supplySlice = createSlice({
    name: 'supply',
    initialState: initialSupplyState,
    reducers: {
        resetSupply: (state: SupplySliceType) => {
            state.isErrorSupply = false
            state.isSuccessSupply = false
            state.isLoadingSupply = false
            state.messageSupply = ''
            state.supplyList = []
            state.supply = initialSupply
        }

     },
    extraReducers: (builder) => {
        builder
            .addCase(addSupply.pending, (state: SupplySliceType) => {
                state.isLoadingSupply = true
            })
            .addCase(addSupply.fulfilled, (state: SupplySliceType) => {
                state.isLoadingSupply = false
                state.isSuccessSupply = true
                toast.success("Data successfully saved.")
            })
            .addCase(addSupply.rejected, (state: SupplySliceType, action: AnyAction) => {
                state.isLoadingSupply = false
                state.messageSupply = action.payload
                state.isErrorSupply = true
                toast.error(state.messageSupply)
            })
            .addCase(getAllSupplies.pending, (state: SupplySliceType) => {
              state.isLoadingSupply = true  
            })
            .addCase(getAllSupplies.fulfilled, (state: SupplySliceType, action) => {
                state.isLoadingSupply = false
                state.isSuccessSupply = true
                state.supplyList = action.payload
            })
            .addCase(getAllSupplies.rejected, (state: SupplySliceType, action: AnyAction) => {
                state.isLoadingSupply = false
                state.messageSupply = action.payload
                state.isErrorSupply = true
                toast.error(state.messageSupply)
            })
    },
})


export const {resetSupply} = supplySlice.actions
export default supplySlice.reducer