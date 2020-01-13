import axios from 'axios'

const api = axios.create({
    baseUrl: 'http://192.168.0.126:8000'
})

export default api