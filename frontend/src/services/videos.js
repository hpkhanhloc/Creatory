import axios from 'axios'
const baseURL = '/api'

const getAll = () => {
    const request = axios.get(`${baseURL}/results`)
    return request.then(response => response.data)
}

const getChanel = () => {
    const request = axios.get(`${baseURL}/channels`)
    return request.then(response => response.data)
}

const getVideo = () => {
    const request = axios.get(`${baseURL}/videos`)
    return request.then(response => response.data)
}
export default {getAll, getChanel, getVideo}