import Axios from 'axios'
import { URL_API, headersToken, toFormData } from '../control'

export const index = async (api_url, token, parameters) => {
    try {
        let params = "";
        for (let i = 0; i < parameters.length; i++) {
            params += `${i == 0 ? '?' : '&'}${parameters[i].name}=${parameters[i].value}`
        }

        const response = await Axios.get(`${URL_API}/${api_url}${params}`, headersToken(token))
        if (response.data.success) {
            return (response.data)
        } else {
            console.log(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}

export const storeUpdate = async (api_url, token, id, data, createdUpdated_by_id) => {
    try {
        data = toFormData(data)
        
        let response
        
        if (!id) {
            data.append('created_by_id', createdUpdated_by_id)
            response = await Axios.post(`${URL_API}/${api_url}`, data, headersToken(token))
        } else {
            data.append('updated_by_id', createdUpdated_by_id)
            data.append('_method', 'PATCH')
            response = await Axios.post(`${URL_API}/${api_url}/${id}`, data, headersToken(token))
        }

        return (response.data)
    } catch (error) {
        console.log(error)
    }
}

export const show = async (api_url, token, id) => {
    try {
        const response = await Axios.get(`${URL_API}/${api_url}/${id}`, headersToken(token))

        if (response.data.success) {
            return (response.data.data)
        } else {
            console.log(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}

export const destroy = async (api_url, token, id, updated_by_id) => {
    try {
        const response = await Axios.delete(`${URL_API}/${api_url}/${id}?updated_by_id=${updated_by_id}`, headersToken(token))
        return (response.data)
    } catch (error) {
        console.log(error)
    }
}