import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType, BaseThunkType, useAppDispatch } from '../../../Redux/store'

type DependedSelectFieldPropsType = {
    selector: (state: AppStateType) => any
    getter: (countryId: number, params: any) => BaseThunkType
    value: string | number | undefined
    targetField?: string
    parrentId: number
    onChange: (value: string | number | undefined) => void
}

const DependedSelectField:React.FC<DependedSelectFieldPropsType> = (props) => {

    const dispatch = useAppDispatch()

    const itemList = useSelector(props.selector)
    const [value, setValue] = useState<string | number | undefined>(props.value)
    const [firstValue, setFirstValue] = useState<string | number | undefined>(props.parrentId)

    useEffect(() => {
        !itemList && dispatch(props.getter(
            props.parrentId, 
            {
                page: 1,
                perPage: 1000
            }
        ))
    }, [])

    useEffect(() => {
        console.log('123123132 firstValue', firstValue, props.parrentId)
        if (props.parrentId && props.parrentId !== 0) {
            dispatch(props.getter(
                props.parrentId, 
                {
                    page: 1,
                    perPage: 1000
                }
            ))
        }
        firstValue !== props.parrentId && handleChange(undefined)
        // handleChange(undefined)
    }, [props.parrentId]);

    const handleChange = (inputValue: string | number | undefined) => {
        console.log('SelectField handleChange', inputValue, value)
        props.onChange(inputValue ? inputValue : undefined)
        setFirstValue(props.parrentId)
        setValue(inputValue)
    }

    const getOptions = () => {
        if (itemList) {
            return itemList.map((item: any) => {
                return (
                    {
                        value: item.id,
                        label: props.targetField ? item[props.targetField] : item.title,
                    }
                )
            })
        }
        return []
    }

    console.group('DependedSelectField()')
        console.log('props', props)
        console.log('value', value)
        console.log('getOptions()', getOptions())
    console.groupEnd()

    return (
        <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => 
                //@ts-ignore
                (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
                //@ts-ignore
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            style={{ width: '100%' }}
            value={value}
            onChange={handleChange}
            options={getOptions()}
            // disabled={props.parrentId === 0 && getOptions().length === 0}
            disabled={getOptions().length === 0}
        />
    )
}

export default  DependedSelectField