// import { SocialLoginDataType } from '../newComponent/Login/types'
import { instance, url } from './Api'

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
        return instance.get('/api/checkauth')
        .then(response => {
            // console.log('checkAuth', response)
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

    // socialAuth(loginData: SocialLoginDataType) {
    //     return instance.post('/api/auth', loginData)
    //     .then(response => {
    //         console.log('socialAuth', response)
    //         return response
    //     })
    //     .catch(err => {
    //         if (err.response) {
    //             return err.response
    //         } else if (err.request) {
    //         } else {
    //         }
    //         return null
    //     })
    // }
}
