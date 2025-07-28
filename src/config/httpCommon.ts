import axios from 'axios'
// i think when will are in devevlopment mode every can have his/her dev link to the backend
// so i will make the baseUrl dynamic
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const HttpCommon = axios.create({
  baseURL: BASE_URL + '/api',
  withCredentials: true,
  //  flag to accept cookies
  headers: {
    'Content-type': 'application/json'
  }
})
