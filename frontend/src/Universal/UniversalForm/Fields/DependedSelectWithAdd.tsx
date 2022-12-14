import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, InputRef, Select, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
// import { createCurrentItem } from '../../../Redux/adminReducer'
import { AppStateType, BaseThunkType, useAppDispatch } from '../../../Redux/store'

// let index = 0

type DependedSelectFieldPropsType = {
    selector: (state: AppStateType) => any
    getter: (countryId: number, params: any) => BaseThunkType
    value: string | number | undefined
    targetField?: string
    parrentId: number
    onChange: (value: string | number | undefined) => void
    updateFieldName: string
}

const DependedSelectWithAdd: React.FC<DependedSelectFieldPropsType> = (props) => {

    const dispatch = useAppDispatch()
    

    const itemList = useSelector(props.selector)
    const [value, setValue] = useState<string | number | undefined>(props.value)
    // const [index, setIndex] = useState<number>(0)
    const [firstValue, setFirstValue] = useState<string | number | undefined>(props.parrentId)

    let index = itemList ? itemList.length : 0

    useEffect(() => {
        !itemList && props.parrentId && dispatch(props.getter(
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
                    perPage: 5000
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
            index = itemList.length
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

    const [name, setName] = useState('')
    const [searchName, setSearchName] = useState<string>()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const inputRef = useRef<InputRef>(null)

    useEffect(() => {
        console.log('!!!useEffect >>>>>>>>>>', searchName)

        if (
            searchName === '' || 
            searchName && searchName.length === 1
        ) {
            console.log('!!!useEffect false!!!!!!!!!!!', searchName)
            setIsDisabled(true)
        } else if (!searchName) {
            setIsDisabled(true)
        } else {
            const check = itemList ?
                itemList.filter( (item: any) => {
                    return item.title.toLowerCase().includes(searchName ? searchName.toLowerCase() : '')
                }).length !== 0
                : false

            console.group('!!!useEffect else!')
                console.log('check', check)
                console.log('searchName', searchName, )
                console.log('itemList', itemList, )
                itemList && console.log('itemList.length', itemList.filter( (item: any) => {
                    return item.title.toLowerCase().includes(searchName ? searchName.toLowerCase() : '')
                }).length)
            console.groupEnd()

            setIsDisabled(check)
            if (!check) {
                searchName ? setName(searchName) : setName('')
                searchName ? console.log('00001', searchName) :  console.log('00002')
            } else {
                setName('')
                console.log('00003')
            }
        }
    }, [searchName])

    useEffect(() => {
        console.log('0000 useEffect name', name)
    }, [name])

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('0000 onNameChange', event.target.value)
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
        
        console.log('0000 addItem', name)
        console.log('props', props)
        // dispatch(createCurrentItem(
        //     props.updateFieldName,
        //     {
        //         isActive: true,
        //         country: props.parrentId,
        //         title: name
        //     },
        //     {
        //         page: 1,
        //         perPage: 5000
        //     }
        // ))
        // setSearchName(name)

        e.preventDefault();
    }

    console.group('DependedSelectWithAdd()')
    console.log('props', props)
    console.log('value', value)
    console.log('getOptions()', getOptions())
    console.groupEnd()

    return (
        <Select
            showSearch
            optionFilterProp="children"
            filterOption={ (input: string | undefined, option) => {
                setSearchName(input)
                //@ts-ignore
                return (option?.label ?? '').includes(input)
            } }
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
            onBlur={(event: React.FocusEvent<HTMLInputElement>)=>{
                console.log('0000 onblur', event.relatedTarget)
                console.log('0000 onblur', event.target.classList.contains('ant-select-selection-search-input'))
                // setName('')
                // setIsDisabled(true)
                if (!event.relatedTarget) {
                    setName('')
                }
            }}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            disabled={
                                // itemList ?
                                // itemList.filter( (item: any) => {
                                //     // console.log('item', item)
                                //     return item.title.toLowerCase().includes(searchName ? searchName.toLowerCase : '')
                                // }).length > 0
                                // : true
                                isDisabled
                            }
                        />
                        <Button 
                            type="text" 
                            icon={<PlusOutlined />} 
                            onClick={addItem}
                            disabled={
                                // itemList ?
                                // itemList.filter( (item: any) => {
                                //     return item.title.toLowerCase().includes(searchName ? searchName.toLowerCase : '')
                                // }).length > 0
                                // : true
                                isDisabled
                            }
                        >
                            Add item({isDisabled})
                        </Button>
                    </Space>
                </>
            )}
        />
    )
}

export default DependedSelectWithAdd