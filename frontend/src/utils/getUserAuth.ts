
const getUserAuth = () => {
    return JSON.parse(localStorage.getItem('user') || '""')
}

export default getUserAuth