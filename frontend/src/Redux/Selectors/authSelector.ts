import { UserType } from "../authReducer"
import { AppStateType } from "../store"

export const selectUserData = (state: AppStateType): UserType | undefined => state.authReducer.userData
export const selectIsAuth = (state: AppStateType): boolean | undefined => state.authReducer.isAuth