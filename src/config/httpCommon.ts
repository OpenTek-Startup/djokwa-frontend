import axios from 'axios'
// i think when will are in devevlopment mode every can have his/her dev link to the backend
// so i will make the baseUrl dynamic
const BASE_URL = process.env.REACT_APP_BASE_URL

export const HttpCommon = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  //  flag to accept cookies
  headers: {
    'Content-type': 'application/json'
  }
})
