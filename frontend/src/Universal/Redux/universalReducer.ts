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
    if (dependedObjects) {
        return async (dispatch, getState) => {
            for (const key in dependedObjects) {
                if (Object.prototype.hasOwnProperty.call(dependedObjects, key)) {
                    const element = dependedObjects[key];
                    if (element.id) {
                        const response = await universalAPI.updateItem(key, element.id, element)
                        if (response.status === 200) {
                            item[key] = response.data.id
                        }
                    } else {
                        const response = await universalAPI.createItem(key, element)
                        if (response.status === 200) {
                            item[key] = response.data.id
                        }
                    }
                }
            }
            dispatch(updateItem(field, item, queryParams, uploadData))
        }
    } else if (uploadData) {
        return async (dispatch, getState) => {
            dispatch(uplodFilesToObject(
                field,
                updateItem,
                item,
                queryParams,
                uploadData
            ))
        }
    } else {
        return async (dispatch, getState) => {
            // queryParams && dispatch(actions.setLastQueryParam(field, queryParams))
            const response = await universalAPI.updateItem(field, item.id, item)
            if (response.status === 200) {
                queryParams && dispatch(getItems(field, queryParams))
                // dispatch(addSuccess('Object updated'))
                // dispatch(checkAuth())
            }
        }
    }
}

const createItem = (
    field: string, 
    item: any, 
    queryParams?: any, 
    uploadData?: FormUploadDataType, 
    dependedObjects?: FormDataType,
    callback?: any,
    callbackParam?: any
): ThunkType => {
    if (dependedObjects) {
        return async (dispatch, getState) => {
            for (const key in dependedObjects) {
                if (Object.prototype.hasOwnProperty.call(dependedObjects, key)) {
                    const element = dependedObjects[key];
                    if (element.id) {
                        const response = await universalAPI.updateItem(key, element.id, element)
                        if (response.status === 201) {
                            item[dependedObjects[key].singleFieldName] = response.data.id
                        }
                    } else {
                        const response = await universalAPI.createItem(key, element)
                        if (response.status === 201) {
                            item[dependedObjects[key].singleFieldName] = response.data.id
                        }
                    }
                }
            }
            dispatch(createItem(field, item, queryParams, uploadData))
        }
    } else if (uploadData) {
        return async (dispatch, getState) => {
            dispatch(uplodFilesToObject(
                field,
                createItem,
                item,
                queryParams,
                uploadData
            ))
        }
    } else {
        return async (dispatch, getState) => {
            // queryParams && dispatch(actions.setLastQueryParam(field, queryParams))
            const response = await universalAPI.createItem(field, item)
            if (response.status === 200 || response.status === 201) {
                queryParams && dispatch(getItems(field, queryParams))
                if (callback) {
                    if (!callbackParam) {
                        dispatch(callback())
                    } else {
                        callback(callbackParam)
                    }
                }
            } else {
                if (callback) {
                    dispatch(callback(callbackParam))
                } 
            }
            // dispatch(addSuccess('Object created'))
        }
    }
}

const uplodFilesToObject = (
    field: string,
    callBack: (field: string, object: any, queryParams: any)=>ThunkType,
    object: any,
    queryParams: any,
    uploadData: FormUploadDataType
): ThunkType => {
    return async (dispatch, getState) => {       
        let objectIds: number[] = []
        let objectId: number = 0
        for (const uploadDataName in uploadData) {
            if (Object.prototype.hasOwnProperty.call(object, uploadDataName)) {
                const uploadDataItem = object[uploadDataName]
                if (uploadDataItem) {
                    if (Array.isArray(uploadDataItem)) {
                        for (let index = 0; index < uploadDataItem.length; index++) {
                            const file = uploadDataItem[index];
                            if (!file.id) {
                                const response = await universalAPI.uploadFile(file.originFileObj)
                                if (response.status < 400 ) {
                                    objectIds.push(response.data.id)
                                }
                            } else {
                                objectIds.push(file.id)
                            }
                        }
                        object[uploadDataName] = objectIds
                    } else {
                        if (!uploadDataItem.id) {
                            const response = await universalAPI.uploadFile(uploadDataItem.originFileObj)
                            if (response.status < 400 ) {
                                objectId =response.data.id
                            }
                        } else {
                            objectId = uploadDataItem.id
                        }
                        object[uploadDataName] = objectId
                    }
                }
            }
        }
        dispatch(callBack(field, object, queryParams))
    }
}

export const getItems = (name: string, query?: QueryParamsType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await universalAPI.getItems(name, query)
        if (response.status === 200) {
            dispatch(actions.setItemsLists(response.data, name))
        }
    }
}

export const getAllItems = (name: string): ThunkType => {
    return async (dispatch, getState) => {
        const response = await universalAPI.getAllItems(name)
        if (response.status === 200) {
            dispatch(actions.setAllItemsLists(response.data, name))
        }
    }
}

export default universalReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>