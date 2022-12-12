import axios from 'axios'

export const url = process.env.REACT_APP_PROXY_URL ? process.env.REACT_APP_PROXY_URL : 'http://localhost:3001/'

export let instance = localStorage.getItem('apikey') ?
    axios.create({
        withCredentials: false,
        baseURL: url,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('apikey'),
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    })
    :
    axios.create({
        withCredentials: false,
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    })

export const refreshToken = () => {
    const token = localStorage.getItem('apikey')
    if (token) {
        instance = axios.create({
            withCredentials: false,
            baseURL: url,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apikey'),
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        })
    } else {
        instance = axios.create({
            withCredentials: false,
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        })
    }
}

export const prepearFilterParams = (params: any, from?: any): string => {
    let filterParam = '';

    if (params.allActive) {
        delete (params.isActive)
        delete (params.allActive)
    } else {
        params.isActive = true
    }

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            // const param = params[key as keyof PaginationParamsType];
            const param = params[key];
            if (!Array.isArray(param) && typeof param === 'object') {
                for (const paramKey in param) {
                    if (Object.prototype.hasOwnProperty.call(param, paramKey)) {
                        if (parseInt(paramKey)) {
                            filterParam = filterParam + '&' + key + '[]=' + param[paramKey]
                        } else {
                            filterParam = filterParam + '&' + key + '[' + paramKey + ']=' + param[paramKey]
                        }
                    }
                }
            } else if (Array.isArray(param)) {
                param.forEach(i => {
                    if (i) filterParam = filterParam + '&' + key + '[]=' + i
                })
            } else {

                const newKey = key.replace('[0]', '[]')
                if (param) filterParam = filterParam + '&' + newKey + '=' + param
            }
        }
    }

    return filterParam.replace('&', '?')
}