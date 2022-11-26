import { AnyAction, Dispatch } from 'redux'
import { authAPI } from '../Api/authApi'
import { BaseThunkType, InferActionsTypes } from './store'
import { setAuth, setUserData } from "./authReducer"

type StatusType = 'failed' | 'success' | 'loading' | 'idle'

export type AppInitialStateType ={
    isInitialized: boolean;
    status: StatusType;
}

let initialState:AppInitialStateType = {
    isInitialized: false,
    status: 'idle',
}

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: AnyAction): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {
                ...state, 
                isInitialized: true, 
                status: action.status
            }
        default:
            return state;
    }
}

export const actions = {
    setStatusApp: (status: StatusType) => ({type: 'APP/SET_STATUS', status} as const),
}

export const getStatusApp = ():ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.checkAuth()
        if (response?.status === 200) {
            dispatch( setUserData(response.data.userData) )
            dispatch( setAuth(true))

        } else {
            dispatch( setAuth(false) )
            localStorage.removeItem('apiKey')
        }
        dispatch(actions.setStatusApp('success'))
    }
}

export default appReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<AnyAction>
export type DispatchType = Dispatch<ActionsTypes>