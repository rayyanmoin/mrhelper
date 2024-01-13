import axios from 'axios'
import { SG_BASE_URL } from './constants'

const api = axios.create({
  baseURL: SG_BASE_URL,
})

api.interceptors.request.use(
  config => {
    /**
     * add your config here
     * the compulsory config which will be sent with every request
     * for example auth token, session id, etc
     */
    return config
  },
  error => Promise.reject(error),
)

api.interceptors.response.use(
  response => {
    //if the response is from studio graph, destructure it and return
    if (response.config.baseURL === SG_BASE_URL && response.data?.data) {
      return response.data.data
    }
    return response
  },
  error => Promise.reject(error),
)

export default api
