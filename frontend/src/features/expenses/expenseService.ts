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

// // update sales
// const updateSales = async(salesData: SalesType) => {
//     // const token = JSON.parse(localStorage.getItem('user') || '""').token
//     const user = await getUserAuth()
//     const repsonse = await axios.put(API_URL + '/update', salesData, {
//         headers: {Authorization: `Bearer ${user.token}`}
//     })
//     return await repsonse.data
// }

// // delete sales
// const deleteSales = async(salesId: AxiosRequestConfig<any>) => {
//     // const token = JSON.parse(localStorage.getItem('user') || '""').token
//     const user = await getUserAuth()
//     await axios.delete(API_URL + '/delete', {
//         headers: {Authorization: `Bearer ${user.token}`},
//         data: {_id: salesId} 
//     })
// }

// // get sales list
// const getSalesList = async() => {
//     // const token = JSON.parse(localStorage.getItem('user') || '""').token
//     const user = await getUserAuth()
//     const response = await axios.get(API_URL, {
//         headers: {Authorization: `Bearer ${user.token}`}
//     })
//     return await response.data
// }

const salesService = {
    inputExpense, 
}

export default salesService