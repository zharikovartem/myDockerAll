import { Select } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { AppStateType, BaseThunkType, useAppDispatch } from '../../../Redux/store'

type SelectFieldPropsType = {
    selector: (state: AppStateType) => any
    getter: (params: any) => BaseThunkType
    value: string | number | undefined
    targetField?: string
    onChange: (value: string | number) => void
}

const SelectField: React.FC<SelectFieldPropsType> = (props) => {

    const dispatch = useAppDispatch()

    const itemList = useSelector(props.selector)

    useEffect(() => {
        // itemList && 
        console.log('SelectField itemList', itemList)
    }, [itemList])

    useEffect(() => {
        !itemList && dispatch(props.getter({
            page: 1,
            perPage: 1000
        }))
    }, [])

    const handleChange = (value: string | number) => {
        console.log('SelectField handleChange', value)
        props.onChange(value)
    }

    const getOptions = () => {
        if (itemList) return itemList.map( (item: any) => {
            return (
                {
                    value: item.id,
                    label: props.targetField ? item[props.targetField] : item.title,
                }
            )
        })
        return []
    }

    return (
        <Select
            style={{ width: '100%' }}
            value={props.value}
            onChange={handleChange}
            options={getOptions()}
        />
    )
}

export default SelectField