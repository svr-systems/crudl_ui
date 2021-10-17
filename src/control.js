//return var url api
export const URL_API = `http://127.0.0.1:8000/api`
//return var header whitout token
export const headersToken = token => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${token}`
        }
    }
}
//return var header whit token
export const headers = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
}
//return var data (convert values to FormData)
export const toFormData = values => {
    let data = new FormData()

    for (var key in values) {
        if (typeof (values[key]) === 'object' && values[key] !== null && Array.isArray(values[key])) {
            data.append(key, JSON.stringify(values[key]));
        }
        else {
            data.append(key, values[key]);
        }
    }

    return data
}
//return options for sweetalert type alert
export const msgAlert = (type, msg) => {
    return {
        showConfirmButton: false,
        icon: type,
        text: msg,
        timer: 2000,
    }
}
//return options for sweetalert type confirm
export const msgConfirm = msg => {
    return {
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
        icon: "warning",
        text: msg,
    }
}