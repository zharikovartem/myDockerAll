import { Dispatch } from 'redux'
import { BaseThunkType, InferActionsTypes } from '../../Redux/store'
import { FormDataType, FormUploadDataType } from '../UniversalForm/UniversalForm'
import { QueryParamsType } from '../UniversalTableView/UniversalTableView'
import { universalAPI } from './universalAPI'

export type ItemsListsType = {
    [key: string] : any[]
}
export type InitialStateType ={
    itemsLists: ItemsListsType
    itemsListsCount: {[key: string] : number}
    allItemsLists: ItemsListsType
    allItemsListsCount: {[key: string] : number}
}

let initialState:InitialStateType = {
    itemsLists: {},
    itemsListsCount: {},
    allItemsLists: {},
    allItemsListsCount: {}
}

type ActionsType = InferActionsTypes<typeof actions>

const universalReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'UNIVERSAL/SET_ALL_ITENS_LIST':
            const allItemsLists = {...state.allItemsLists}
            allItemsLists[action.name] = action.itemsListsdata.items
            const allItemsListsCount = {...state.allItemsListsCount}
            allItemsListsCount[action.name] = action.itemsListsdata.totalCount
            return {
                    ...state,
                    allItemsLists: allItemsLists,
                    allItemsListsCount: allItemsListsCount
            }

        case 'UNIVERSAL/SET_ITENS_LIST':
            const itemsLists = {...state.allItemsLists}
            itemsLists[action.name] = action.itemsListsdata.items
            const itemsListsCount = {...state.allItemsListsCount}
            itemsListsCount[action.name] = action.itemsListsdata.totalCount
            return {
                    ...state,
                    itemsLists: itemsLists,
                    itemsListsCount: itemsListsCount
            }
            
        default:
            return state;
    }
}

export type itemsListsdata = {
    items: any[]
    totalCount: number
}

export const actions = {
    setAllItemsLists: (itemsListsdata: itemsListsdata, name: string) => ({type: 'UNIVERSAL/SET_ALL_ITENS_LIST', itemsListsdata, name} as const),
    setItemsLists: (itemsListsdata: itemsListsdata, name: string) => ({type: 'UNIVERSAL/SET_ITENS_LIST', itemsListsdata, name} as const),
}

export const updateItem = (
    field: string, 
    item: any, 
    queryParams?: any, 
    uploadData?: FormUploadDataType, 
    dependedObjects?: FormDataType
): ThunkType => {
    return async (dispatch, getState) => {
        // const response = await universalAPI.getItems(name, query)
        // console.log(response)
        // if (response.status === 200) {
        //     dispatch(actions.setAllItemsLists(response.data, name))
        // }
    }
}

export const getItems = (name: string, query?: QueryParamsType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await universalAPI.getItems(name, query)
        console.log(response)
        if (response.status === 200) {
            dispatch(actions.setItemsLists(response.data, name))
        }
    }
}

export const getAllItems = (name: string): ThunkType => {
    return async (dispatch, getState) => {
        const response = await universalAPI.getAllItems(name)
        console.log(response)
        if (response.status === 200) {
            dispatch(actions.setAllItemsLists(response.data, name))
        }
    }
}

export default universalReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>