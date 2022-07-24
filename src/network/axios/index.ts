import axios from 'axios'

let axiosInstance = axios.create()
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.baseURL = '*****'


export default axiosInstance
