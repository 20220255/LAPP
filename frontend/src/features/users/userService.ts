import axios from 'axios'
import getUserAuth from '../../utils/getUserAuth'

const API_URL = '/api/users'


// Get Users List
const getAllUsers = async () => {
    const user = await getUserAuth()
    
    const response = await axios.get(API_URL + '/allUsers', {headers: {Authorization: `Bearer ${user.token}`}})

    return response.data
}

const userService = {
    getAllUsers,
}

export default userService