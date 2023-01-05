import React, { ChangeEvent, useEffect, useState } from 'react'
import { 
    Grid, Typography, TextField, Accordion, AccordionSummary, AccordionDetails, Divider, AccordionActions, Button } from '@mui/material'
import moment from 'moment'
import { FilterType, getParamsMapForTable, QueryParamsType } from '../UniversalTableView'
import { SelectFromFilter } from '../FilterElements/SelectFromFilter'
import { VerifiedCheckBox } from '../FilterElements/VerifiedCheckBox'
import { useLocation, useNavigate } from 'react-router-dom'
import MultiSelectFromFilter from '../FilterElements/MultiSelectFromFilter'
import SortByComponent from '../FilterElements/SortByComponent'

type FilterDataType = {
    [key: string]: string | number
}

type TableFilterPropsType = {
    filter: FilterType[]
    params: QueryParamsType
    setParams: React.Dispatch<React.SetStateAction<QueryParamsType>>
}

const TableFilter: React.FC<TableFilterPropsType> = (props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const [expanded, setExpanded] = useState<boolean>(false)
    useEffect(() => {
        console.log('expanded', expanded)
    }, [expanded]);

    const getFilterData = () => {
        // const paramsMap = getParamsMapForTable(history.location.search)
        const newFilterData: FilterDataType = {}
        // for (const key in paramsMap) {
        //     if (Object.prototype.hasOwnProperty.call(paramsMap, key)) {
        //         if (!['page', 'perPage'].includes(key)) {
        //             newFilterData[key] = paramsMap[key]
        //         }
        //     }
        // }

        return newFilterData
    }

    // const [filterData, setFilterData] = useState<FilterDataType>({})
    const [filterData, setFilterData] = useState<FilterDataType>(getFilterData())

    useEffect(() => {
        console.log('filterData', filterData)
        if (Object.keys(filterData).length === 0) onFilter()
    }, [filterData])

    // useEffect(() => {
    //     setFilterData(getFilterData())

    //     const paramsMap = getParamsMapForTable(history.location.search)
    //     if (filterData.tab && filterData.tab !== paramsMap.tab) {
    //         setExpanded(false)
    //     }
    // }, [history.location.search]);

    const onFilter = () => {
        const paramsMap = getParamsMapForTable(location, navigate, undefined, props.params)
        const clearParamsMap: QueryParamsType = {
            page: paramsMap.page ? paramsMap.page : 1,
            perPage: paramsMap.perPage ? paramsMap.perPage : 10,
            allActive: props.params.allActive
        }

        for (const key in filterData) {
            if (Object.prototype.hasOwnProperty.call(filterData, key)) {
                clearParamsMap[key] = filterData[key]
            }
        }
        // clearParamsMap.page = 1//paramsMap.page
        // clearParamsMap.perPage = 15//paramsMap.perPage
        // clearParamsMap.tab = paramsMap.tab

        props.setParams(clearParamsMap)

        // navigate({
        //     ...location,
        //     search: prepearFilterParams(clearParamsMap)
        // })

        // console.log('onSubmit', filterData)
    }

    const onChangeDate = (date: number, fieldName: string) => {
        console.log('onChangeDate')

        const newFilterData: FilterDataType = {...filterData}
        newFilterData[fieldName] = date

        setFilterData(newFilterData)
    }

    const onChange = (ev: ChangeEvent<HTMLInputElement>, fieldName: string) => {
        console.log('onChange', ev.target.value, fieldName)

        const newFilterData: FilterDataType = {...filterData}
        newFilterData[fieldName] = ev.target.value

        setFilterData(newFilterData)
    }

    const onSelect = (value: any, fieldName: string) => {
        console.log('onSelect', value, fieldName)

        const newFilterData: FilterDataType = {...filterData}
        newFilterData[fieldName] = value

        setFilterData(newFilterData)
    }

    const onSort = (value: any, target: string) => {
        const newFilterData: FilterDataType = {...filterData}
        for (const key in newFilterData) {
            if (Object.prototype.hasOwnProperty.call(newFilterData, key)) {
                const element = newFilterData[key];
                if (key.includes('sortBy[')) {
                    delete(newFilterData[key])
                }
            }
        }
        newFilterData['sortBy['+target+']'] = value
        setFilterData(newFilterData)
    }

    const getElement = (el: FilterType) => {
        switch (el.type) {
            case 'string':
                return(
                    <TextField 
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => { 
                            onChange(ev, el.props.name) 
                        }}
                        value={filterData[el.props.name] ? filterData[el.props.name] : ''}
                        {...el.props}
                    />
                )

            case 'select':
                return(
                    <SelectFromFilter
                        onChangeOption={ (ev: ChangeEvent<HTMLInputElement>) => {
                            el.props && el.props.name && onSelect(ev, el.props.name)
                        }}
                        value={filterData[el.props.name]}
                        {...el.props}
                    />
                )

            case 'multiSelect':
                return(
                    <MultiSelectFromFilter
                        onChangeOption={ (ev: ChangeEvent<HTMLInputElement>) => {
                            el.props && el.props.name && onSelect(ev, el.props.name)
                        }}
                        value={filterData[el.props.name]}
                        {...el.props}
                    />
                )

            case 'date':
                return(
                    <TextField 
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => { 
                            console.log(ev.target.value)
                            console.log('!!!!', new Date( (Date.parse(ev.target.value) / 1000)  as number * 1000) )
                            onChangeDate( Date.parse(ev.target.value) / 1000, el.props.name) 
                        }}
                        value={filterData[el.props.name] 
                            ? 
                            moment.unix(filterData[el.props.name] as number).format("YYYY-MM-DD")
                            : ''}
                        {...el.props}
                    />
                )

            case 'checkbox':
                return(
                    <>
                        <VerifiedCheckBox
                            value={filterData[el.props.name] ? !!filterData[el.props.name] : false}
                            onChange={ (ev: ChangeEvent<HTMLInputElement>) => {
                                console.log('VerifiedCheckBox onChange', ev.currentTarget.checked, el.props.name)
                                console.log('el.props', el.props)
                                onSelect(ev.currentTarget.checked, el.props.name)
                            }}
                            {...el.props}
                        />
                        {el.props.label && <span>{el.props.label}</span>}
                    </>
                )
        
            case 'sortBy':
                return(
                    <SortByComponent
                        label={el.props.label}
                        name={el.props.name}
                        options={el.props.options}
                        onChange={ (field: string, direction: 'asc' | 'desc') => {
                            console.log('SortByComponent', field, direction)
                            onSort(direction, field)
                        }}
                    />
                )
            default:
                return <></>
        }
    }

    return (
        <Accordion
            expanded={expanded}  
            // className={classes.filter_panel}
        >
            <AccordionSummary
                expandIcon={<>ExpandMore</>}
                aria-controls='panel1c-content'
                id='panel1c-header'
                onClick={ () => {
                    setExpanded(!expanded)
                }}
                // style={{
                //     border: '1px solid rgba(0,0,0,.1)',
                //     backgroundColor: 'lightcoral'
                // }}
            >
                <Typography 
                    variant='button'
                >
                    Filter
                </Typography>
            </AccordionSummary>

            <form onSubmit={(e) => {
                e.preventDefault()
                onFilter()
            }}>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {props.filter.map((el: FilterType, index: number) => (
                            // @ts-ignore
                            <Grid
                                key={index}
                                item
                                {...el.gridItemSettings}
                            >
                                {getElement(el)}
                                {/* {!el.component &&
                                    React.cloneElement(
                                        el.element,
                                        {
                                            onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                                                console.log('onChange', el)
                                                if (el.element.props.type === 'date')
                                                    onChangeDate(ev, el.element.props.name)
                                                else {
                                                    onChangeFilter(ev, el.element.props.name)
                                                }
                                            },
                                            onSelect: (ev: any) => {
                                                console.log('onSelect')
                                                onChangeFilter(ev, el.element.props.name)
                                            },
                                            onClick: (ev: any) => {
                                                console.log('onClick')
                                                onChangeFilter(ev, el.element.props.name)
                                            }
                                        }
                                    )
                                } */}

                                {/* {el.element.props.name === 'checked' && <span>Проверен</span>} */}


                                {/* {el.component
                                    &&
                                    <el.component
                                        {...el.props}
                                        value={
                                            props.filterControls &&
                                                props.filterControls[el.element.props.name]
                                                ?
                                                props.filterControls[el.element.props.name].value
                                                :
                                                null
                                        }
                                        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                                            console.log('onChange!!!!!!!!!', el.element.props.name)
                                            if (el.element.props.type === 'date')
                                                onChangeDate(ev, el.element.props.name)
                                            else {
                                                onChangeFilter(ev, el.element.props.name)
                                            }
                                        }}
                                    />
                                } */}
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button
                        type={'reset'}
                        size='small'
                        onClick={(event: any) => {
                            setFilterData({})
                            // onFilter()
                        }}
                    >
                        Reset filter
                    </Button>
                    <Button size='small' color='primary' type={'submit'}>
                        Apply filter
                    </Button>
                </AccordionActions>
            </form>
        </Accordion>
    )
}

export default TableFilter

// const useStyles = makeStyles(() =>
//     createStyles({
//         filter_panel: {
//             marginBottom: 8
//         }
//     })
// )