import { Dispatch } from 'redux'
import { authAPI, LoginDataType } from '../Api/authApi'
import { BaseThunkType, InferActionsTypes } from './store'

export type UserType = {
    id?: number
    fullName: string
    phone?: any
    email: string
    password?: string
}

export type InitialStateType ={
    isAuth?: boolean
    userData?: UserType
}

let initialState:InitialStateType = {

}

type ActionsType = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_AUTH':
            return {
                    ...state,
                    isAuth: action.isAuth,
                    userData: !action.isAuth ? undefined : state.userData,
            }

        case 'AUTH/SET_USER_DATA':
            return {
                ...state,
                userData: action.userData
            }
        default:
            return state
    }
}

export const actions = {
    setAuth: (isAuth: boolean) => ({type: 'AUTH/SET_AUTH', isAuth} as const),
    setUserData: (userData: UserType) => ({type: 'AUTH/SET_USER_DATA', userData} as const),
}

export const setAuth = (status: boolean): ThunkType => {
    return async (dispatch, getState) => {
        dispatch( actions.setAuth(status) )
    }
}

export const setUserData = (userData: UserType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch( actions.setUserData(userData) )
    }
}

export const checkAuth = (): ThunkType => {
    return async (dispatch, getState) => {
        const response = await authAPI.checkAuth()
        if (response?.status === 200) {
            dispatch( actions.setUserData(response.data.userData) )
            dispatch( actions.setAuth(true))

        } else {
            dispatch( actions.setAuth(false) )
            localStorage.removeItem('apiKey')
        }
    }
}

export const login = (userData: LoginDataType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await authAPI.loginCheck({
            ...userData,
            email: userData.username
        })
        console.log(response)
        if (response.status === 200) {
            localStorage.setItem('apikey', response.data.token)
            // dispatch( actions.setAuth(true) )
            dispatch(checkAuth())
        } else {
            dispatch( actions.setAuth(false) )
        }
        // dispatch( actions.setUserData(userData) )
    }
}

export default authReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>