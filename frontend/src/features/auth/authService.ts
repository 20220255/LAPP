import axios from 'axios'
import { UserType } from '../../pages/Register'
import { UserLoginType } from '../../pages/Login'

const API_URL = '/api/users'

// Regster user
const register = async (userData: UserType) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData: UserLoginType) => {
    const response = await axios.post(API_URL + '/login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


const authService = {
    register,
    login
}

export default authService