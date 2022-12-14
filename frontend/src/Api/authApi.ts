import { instance } from './Api'

export type LoginDataType = {
    username: string
    password: string
    plainPassword?: string
    email?: string
}

export const authAPI = {
    loginCheck(loginData: LoginDataType) {
        return instance.post('/api/login_check', loginData)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    register(loginData: LoginDataType) {
        loginData.plainPassword = loginData.password
        loginData.email = loginData.username
        return instance.post('/api/registration', loginData)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    checkAuth() {
        return instance.get('/api/checkauth',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apikey'),
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        })
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    }
}
