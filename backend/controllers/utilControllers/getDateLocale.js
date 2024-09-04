
const getLocaleDate = (date) => {

    const fullDate = date.split('/')
    return formatedDate = fullDate[2] + '-' + fullDate[0] + '-' + fullDate[1]
    // console.log('date - ', date)
    // const month = date.getMonth() + 1
    // return date.getFullYear() + '-' + month + '-' + date.getDate()
}

module.exports = { getLocaleDate };



