import axios, { AxiosRequestConfig } from 'axios'
import { ExpenseType } from './expenseSlice'
import getUserAuth from '../../utils/getUserAuth'

const API_URL = '/api/expense'


// input expense
const inputExpense = async(expenseData: ExpenseType) => {
    const user = await getUserAuth()
    const response = await axios.post(API_URL, expenseData, {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await response.data
}

// update sales
const updateExpense = async(expenseData: ExpenseType) => {
    const user = await getUserAuth()
    const repsonse = await axios.put(API_URL + '/update', expenseData, {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await repsonse.data
}

// delete expense
const deleteExpense = async(expenseId: AxiosRequestConfig<any>) => {
    const user = await getUserAuth()
    await axios.delete(API_URL + '/delete', {
        headers: {Authorization: `Bearer ${user.token}`},
        data: {_id: expenseId} 
    })
}

// get expense list
const getExpenseList = async() => {
    // const token = JSON.parse(localStorage.getItem('user') || '""').token
    const user = await getUserAuth()
    const response = await axios.get(API_URL, {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await response.data
}

const salesService = {
    inputExpense, updateExpense, deleteExpense, getExpenseList
}

export default salesService