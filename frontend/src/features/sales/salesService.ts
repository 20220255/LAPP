import axios, { AxiosRequestConfig } from 'axios'
import { SalesType } from './salesSlice'

const API_URL = '/api/sales'

// input sales
const inputSales = async(salesData: SalesType) => {
    const token = JSON.parse(localStorage.getItem('user') || '""').token
    const response = await axios.post(API_URL, salesData, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return await response.data
}

// update sales
const updateSales = async(salesData: SalesType) => {
    const token = JSON.parse(localStorage.getItem('user') || '""').token
    const repsonse = await axios.put(API_URL + '/update', salesData, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return await repsonse.data
}

// delete sales
const deleteSales = async(salesId: AxiosRequestConfig<any>) => {
    const token = JSON.parse(localStorage.getItem('user') || '""').token
    await axios.delete(API_URL + '/delete', {
        headers: {Authorization: `Bearer ${token}`},
        data: {_id: salesId} 
    })
}

// get sales list
const getSalesList = async() => {
    const token = JSON.parse(localStorage.getItem('user') || '""').token
    const response = await axios.get(API_URL, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return await response.data
}

const salesService = {
    inputSales, getSalesList, updateSales, deleteSales
}

export default salesService