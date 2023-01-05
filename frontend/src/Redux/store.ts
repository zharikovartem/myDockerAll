import { Action, combineReducers } from "redux"
import { ThunkAction } from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./appReducer"
import authReducer from "./authReducer"
import { useDispatch } from "react-redux"
import universalReducer from "../Universal/Redux/universalReducer"


let rootReducer = combineReducers({
    appReducer: appReducer,
    authReducer: authReducer,
    universalReducer: universalReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export default store