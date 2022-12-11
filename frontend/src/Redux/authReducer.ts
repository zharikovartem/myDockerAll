import { Dispatch } from 'redux'
import { authAPI } from '../Api/authApi'
import { BaseThunkType, InferActionsTypes } from './store'

export type UserType = {
    id?: number
    fullName: string
    phone?: any
    email?: string
}

export type InitialStateType ={
    isAuth: boolean
    userData?: UserType
}

let initialState:InitialStateType = {
    isAuth: false
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
            return state;
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

export default authReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>