import Axios from 'axios'
import { URL_API, headers, headersToken } from '../control'

export const logIn = async data => {
  try {
    const response = await Axios.post(`${URL_API}/auth/login`, data, headers)
    return (response.data)
  } catch (error) {
    console.log(error)
  }
}

export const logOut = async token => {
  try {
    const response = await Axios.get(`${URL_API}/auth/logout`, headersToken(token))
    return (response.data)
  } catch (error) {
    console.log(error)
  }
}
