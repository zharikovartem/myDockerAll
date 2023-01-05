import { AnyAction, Dispatch } from 'redux'
import { authAPI } from '../Api/authApi'
import { setAuth, setUserData } from "./authReducer"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseThunkType } from './store'

const APP_SET_STATUS_INITIALIZED = 'APP/SET_STATUS'

type StatusType = 'failed' | 'success' | 'loading' | 'idle'

export type AppInitialStateType = {
    isInitialized: boolean
    status: StatusType
}

let initialState: AppInitialStateType = {
    isInitialized: false,
    status: 'idle',
}

// type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: AnyAction): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {
                ...state,
                isInitialized: true,
                status: action.status
            }
        default:
            return state
    }
}

// export const actions = {
//     setStatusApp: (status: StatusType) => ({ type: 'APP/SET_STATUS', status } as const),
// }

const setStatusApp = (status: StatusType) => ({type: APP_SET_STATUS_INITIALIZED, status } as const)


export const getStatusApp = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.checkAuth()
        if (response?.status === 200) {
            dispatch(setUserData(response.data.userData))
            dispatch(setAuth(true))

        } else {
            dispatch(setAuth(false))
            localStorage.removeItem('apiKey')
        }
        dispatch(setStatusApp('success'))
    }
}

export default appReducer

type ActionType = ReturnType<typeof setStatusApp>
type ThunkType = BaseThunkType<ActionType>