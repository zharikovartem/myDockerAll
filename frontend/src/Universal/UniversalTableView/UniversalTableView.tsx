import {
    Box, Grid, Skeleton, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useLocation, useNavigate, Location } from 'react-router-dom'
import { AppDispatch, AppStateType, BaseThunkType } from '../../Redux/store'
import TableFilter from './FieldsHelpers/TableFilter'
import { TableContentBody } from './TableContentBody'
import { TableItemRow } from './TableItemRow'
import TablePaginationComponent from './TablePaginationComponent'
import styled from 'styled-components'
import { prepearFilterParams } from '../Helpers/prepearFilterParams'
import { selectCurrentList } from '../../Redux/Selectors/universalSelector'
import { getItems } from '../../Redux/universalReducer'

const defaultParams: QueryParamsType = {
    page: 1,
    perPage: 15
}

const UniversalTableView: React.FC<UniversalTableViewPropsType> = (props) => {

    const dispatch = useDispatch<AppDispatch>()
    const location: Location = useLocation()
    const navigate = useNavigate()

    let itemList = useSelector(selectCurrentList(props.objectData.fieldName))

    const initParams = () => {
        return !props.isQuery 
            ? props.objectData && props.objectData.defaultParams ? props.objectData.defaultParams : defaultParams 
            : getParamsMapForTable(location, navigate, undefined, props.objectData.defaultParams)
    }

    const [params, setParams] = useState<QueryParamsType>(initParams())

    const [isLoad, setIsLoad] = useState<boolean>(false)

    console.group('UniversalTableView group')
    //     console.log('props', props)
    //     console.log('useSelector', useSelector(selectCurrentList(props.objectData.fieldName)))
        console.log('itemList', itemList)
        console.log('isLoad', isLoad)
    //     console.log('isLoad', isLoad)
        console.log('params',  params)
    console.groupEnd()

    useEffect(() => {
        setIsLoad(false)

        !itemList && dispatch(getItems(
            props.objectData.fieldName,
            props.objectData.defaultParams ? props.objectData.defaultParams : {
                page: 1,
                perPage: 15
            }
        ))
    }, [itemList])

    useEffect(() => {
        if ( !props.isQuery ) {
            props.objectData && dispatch(getItems(
                props.objectData.fieldName, 
                {...params, allActive: true}
            ))
        } else {
            alert('navigate')
            navigate({
                ...location,
                search: prepearFilterParams(params)
            })
        }
        // props.fetch && props.fetch.function ?  props.fetch?.function() : ()=>{}
    }, [params])

    const renderLoadTable = () => {
        console.log(renderLoadTable)
        let rows = []
        if (params.perPage) {
            for (let i = 0; i < params.perPage; i++) {
                rows.push(
                    <TableRow key={i}>
                        <TableCell colSpan={props.fields.length} style={{padding: 24}}>
                            <Skeleton animation={'wave'} variant={'text'}/>
                        </TableCell>
                    </TableRow>
                )
            }
        }
        console.log('renderLoadTable', rows)
        return <>{rows}</>
    }

    const refreshData = () => {
        dispatch(getItems(
            props.objectData.fieldName,
            params
        ))
    }

    return (
        <>
            <Box style={{position: 'relative'}}>
                {/* <Card className='card-box mb-4' elevation={2} square> */}
                    {props.filter &&
                        <TableFilter
                            filter={props.filter}
                            params={params}
                            setParams={setParams}
                        />
                    }
                    <Grid container className='card-header pr-2'>
                        <Grid item xs={props.headActions ? 24 : 12}>
                            {/* <div className='card-header--title'>
                                <Typography
                                    variant='overline'>{props.tableName}</Typography>
                            </div> */}
                            <Header><h1>{props.tableName.toUpperCase()}</h1></Header>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='card-header--actions'
                                 style={{textAlign: 'right'}}>
                                {props.headActions && props.headActions}
                            </div>
                        </Grid>
                    </Grid>
                    <TableContainer>
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead style={{backgroundColor: '#3b3e660f'}}>
                                <TableItemRow
                                    fields={props.fields}
                                    paginationParams={params as QueryParamsType}
                                    updatePaginationParam={() => {
                                    }}
                                />
                            </TableHead>

                            <TableBody>
                                {isLoad && !itemList
                                    ? renderLoadTable()
                                    :
                                    <TableContentBody
                                        fields={props.fields}
                                        refreshData={refreshData}
                                        items={itemList as any[]}
                                        paginationParams={params}
                                        // fetch={props.fetch ? props.fetch : {
                                        //     function: (params: QueryParamsType) => (getItems(props.objectData.fieldName, params))
                                        // }}
                                        objectData={props.objectData}
                                    />
                                }
                                {<TableRow>
                                    <TablePaginationComponent
                                        params={params}
                                        setParams={setParams}
                                        objectName={props.objectData.fieldName}
                                    />
                                </TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                {/* </Card> */}
            </Box>
        </>
    )
}

export default UniversalTableView

const Header = styled.div({
    textAlign: 'center'
})

export type FilterType = {
    type: 'string' | 'number' | 'select' | 'multiSelect' | 'checkbox' | 'date' | 'sortBy'
    props: any
    gridItemSettings: {
        xs: number
    }
}

export type ObjectDataType = {
    fieldName: string
    reducerField?: string
    defaultParams?: QueryParamsType
    actions?: any
}

type UniversalTableViewPropsType = {
    /**
     * Объект содержащий thunk для получения массива items
     */
    fetch?: {
        function?: (params?: any) => void
        action?: any
        countSelector?: (state: AppStateType) => number | undefined
        selector?: (state: AppStateType) => any[] | undefined
    }

    objectData: ObjectDataType

    /**
     * Selector для данных items
     */
    selector?: (state: AppStateType) => any

    /**
     * key нужной закладки в Tabs
     * Используется только при наличии <Tab> на странице.
     */
    tab?: string
    /**
     * key текущей закладки в Tabs
     * Используется только при наличии <Tab> на странице.
     */
    activeTab?: string
    /**
     * Описание параметров фильтрации
     * Используется только при наличии фильтра на странице.
     */
    filter?: FilterType[]
    /**
     * JSX.Element эдемент будет выводится возле названия таблицы
     */
    headActions: JSX.Element
    /**
     * Названия таблицы
     */
    tableName: string
    /**
     * Описание параметров Полей таблицы
     */
    fields: FieldsType[]

    /**
     * Будут ли дублироваться параметры пагинации в query параметрах url
     */
    isQuery?: boolean
}

export type FieldsType = {
    sortName?: string
    label: string
    name?: string
    component?: any //React.FC<UniversalActionsPropsType> | ReactNode
    target?: 'template' | 'fragment' | 'chain' | null
    action?: (targetId: number, fieldName?: string, value?: any) => void
    isPublic?: boolean
}

export type DirectionType = 'asc' | 'desc'

export type QueryParamsType = PaginationParamsType & FilterParamsType

type sortByType = {
    // [key: string]: string | number
    [key: string]: DirectionType
}

export type FilterParamsType = {
    [key1: string]: any
}

export type PaginationParamsType = {
    perPage: number
    page: number,
    sortBy?: sortByType
}

export const setParamsMapForTable = (
    params: any, 
    navigate: NavigateFunction, 
    location: Location,
    from?: any
) => {
    console.log('setParamsMapForTable from', from)
    console.log('setParamsMapForTable newParams: ', {...params})
    const query = prepearFilterParams(params, 'setParamsMapForTable =>'+from)
    navigate({
        ...location,
        search: query
    })
}

export const getParamsMapForTable = (location: Location, navigate?: NavigateFunction, perPage?: number, initParams?: QueryParamsType): QueryParamsType => {
    if ( location.search ) {
        const params = location.search.split('?')[1].split('&')
        const paramsMap: PaginationParamsType = {...initParams ? initParams : defaultParams}
        
        if (perPage) {
            paramsMap.perPage = perPage
        }

        console.log('1-!!!paramsMap', {...paramsMap})

        params.forEach(i => {
            const parts = i.split('=')

            if (parts[0].includes('[]')) {
                const fieldname = parts[0].replace('[]', '')
                if (!paramsMap[fieldname as keyof PaginationParamsType]) {
                    // @ts-ignore
                    paramsMap[fieldname as keyof PaginationParamsType] = [decodeURI(parts[1])]
                } else {
                    // @ts-ignore
                    paramsMap[fieldname as keyof PaginationParamsType]
                    // @ts-ignore 
                    && fieldname && paramsMap[fieldname as keyof PaginationParamsType].push(decodeURI(parts[1]))
                }
                
            } else {
                if (parts[0] !== '') {
                    // @ts-ignore
                    paramsMap[parts[0] as keyof PaginationParamsType] = decodeURI(parts[1])
                }
            }
        })

        // if (perPage) paramsMap.perPage = perPage

        console.log('2-!!!paramsMap', {...paramsMap})

        if (!paramsMap.perPage) paramsMap.perPage = perPage ? perPage : 16
        if (!paramsMap.page) paramsMap.page = 1

        return paramsMap
    }

    if (navigate) {
        navigate({
            ...location,
            search: prepearFilterParams(initParams ? initParams : defaultParams, 'getParamsMapForTable navigate')
        })
    } 

    if (perPage) {
        return {
            ...defaultParams,
            perPage: perPage
        }
    }

    return defaultParams
}













