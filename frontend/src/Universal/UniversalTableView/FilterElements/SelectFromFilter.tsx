import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { createStyles, MenuItem, TextField } from '@mui/material'

type DataType = string[] | {
    id: number
    name?: string
    title?: string
}[] | {
    [key: string]: string | number
}

type TestComponentPropsType = {
    name: string
    label: string
    value?: string | number
    options: DataType
    onChangeOption: (option: any) => void
    className?: string
}

export const SelectFromFilter: FC<TestComponentPropsType> = (props) => {

    const [value, setValue] = useState<string | number>(props.value ? props.value : '')

    console.group('SelectFromFilter')
        console.log(props.options)
    console.groupEnd()

    useEffect(() => {
        props.value ? setValue(props.value) : setValue('')
    }, [props.value]);

    const getValuesForSelect = (data: DataType) => {
        let mappedOptions: JSX.Element[] = []
        if (Array.isArray(data)) {
            mappedOptions = data.map((o, index) => {
                return (
                    <MenuItem value={typeof o === 'object' ? o.id : o} key={o + '-' + index}>
                        {typeof o === 'object' ? o.name ? o.name : o.title : o}
                    </MenuItem>
                )

            })
        } else {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    // статус NEW не должен появлятся в фильтрах
                    if (key !== 'NEW') mappedOptions.push(
                        <MenuItem value={key} key={key}>
                            {data[key]}
                        </MenuItem>
                    )
                }
            }
        }
        return mappedOptions
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log('handleChange name: ', props.name, props.onChangeOption)
        props.name === 'lastStatusChanger'
            ? props.onChangeOption(parseInt(e.target.value))
            : props.onChangeOption(e.target.value)

        // !props.value && setValue(e.target.value)
    }

    return (
        <TextField
            name={props.name}
            label={props.label}
            value={value}
            onChange={handleChange}
            variant='outlined'
            fullWidth
            select
            InputLabelProps={{ shrink: true }}
        >
            {getValuesForSelect(props.options)}
        </TextField>
    )
}