import { Action, combineReducers, createStore, applyMiddleware, AnyAction, Dispatch } from "redux"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./appReducer"
import authReducer from "./authReducer"
import { useDispatch } from "react-redux"


let rootReducer = combineReducers({
    appReducer: appReducer,
    authReducer: authReducer
})
type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const store = configureStore({
//     reducer: {
//       app: appReducer
//     }
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// // type ActionsTypes = InferActionsTypes<AnyAction>
// export type ThunkType = BaseThunkType<AnyAction>
// export type DispatchType = Dispatch<AnyAction>

export default store