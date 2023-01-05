import { AppStateType } from "../../Redux/store"

export const selectCurrentAllList = (field: string) => (state: AppStateType) => {
    return state.universalReducer.allItemsLists[field]
}

export const selectCurrentAllListCount = (field: string) => (state: AppStateType) => {
    return state.universalReducer.allItemsListsCount[field]
}

export const selectCurrentList = (field: string) => (state: AppStateType) => {
    return state.universalReducer.itemsLists[field]
}

export const selectCurrentListCount = (field: string) => (state: AppStateType) => {
    return state.universalReducer.itemsListsCount[field]
}