import { FormControl, MenuItem, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'

type DirectionType = 'asc' | 'desc'

type SortByComponentPropsType = {
    label: string
    name: string
    options: string[]
    onChange: (field: string, direction: DirectionType) => void
}

const SortByComponent:React.FC<SortByComponentPropsType> = (props) => {

    const [value, setValue] = useState<string>()
    const [direction, setDirection] = useState<DirectionType>('asc')

    useEffect(() => {
        value && props.onChange(value, direction)
    }, [value, direction])

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleChangeDirection = (e: ChangeEvent<HTMLInputElement>) => {
        setDirection(e.target.value as DirectionType)
    }

    const getValuesForSelect = (options: string[]) => {
        return options.map( (i) => {
            return (
                <MenuItem value={i} key={i}>
                    {i}
                </MenuItem>
            )
        })
    }

    return (
        <>
            {/* <span>{props.label}:</span> */}
            <FormControl sx={{ m: 0, width: '70%' }}>
                <TextField
                    name={props.name}
                    label={props.label}
                    value={value}
                    onChange={handleChangeValue}
                    variant='outlined'
                    fullWidth
                    select
                    InputLabelProps={{ shrink: true }}
                >
                    {getValuesForSelect(props.options)}
                </TextField>
            </FormControl>
            <FormControl sx={{ m: 0, width: '30%' }}>
                <TextField
                    name="direction"
                    label='direction'
                    value={direction}
                    onChange={handleChangeDirection}
                    variant='outlined'
                    fullWidth
                    select
                    InputLabelProps={{ shrink: true }}
                >
                    <MenuItem value='asc' key='asc'>asc</MenuItem>
                    <MenuItem value='desc' key='desc'>desc</MenuItem>
                </TextField>
            </FormControl>
        </>
    )
}

export default  SortByComponent