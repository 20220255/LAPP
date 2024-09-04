
const getLocaleDate = (date) => {
    const fullDate = date.split('/')
    return formatedDate = fullDate[2] + '-' + fullDate[0] + '-' + fullDate[1]
}

module.exports = { getLocaleDate };



