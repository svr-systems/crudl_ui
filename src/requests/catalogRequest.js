import Axios from 'axios'
import { URL_API, headersToken } from '../control'

export const catalog = async (name, token, no_order) => {
    try {
        const response = await Axios.get(`${URL_API}/catalog?name=${name}&no_order=${no_order ? no_order : false}`, headersToken(token))
        if (response.data.success) {
            return (response.data.data)
        } else {
            console.log(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}
