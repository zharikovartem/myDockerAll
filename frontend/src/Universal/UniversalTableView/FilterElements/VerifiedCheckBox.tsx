import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Checkbox } from '@mui/material'

type VerifiedCheckBoxPropsType = {
    name: string
    value: boolean
    setChecked: (value: boolean) => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const VerifiedCheckBox: FC<VerifiedCheckBoxPropsType> = (props) => {

    const [value, setvalue] = useState<boolean>(props.value)
    useEffect(() => {
        setvalue(props.value)
    }, [props.value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.checked
        props.setChecked(value)
        setvalue(value)
    }

    return (
        <>
            <Checkbox
                name={props.name}
                checked={value}
                onChange={props.onChange ? props.onChange : handleChange}
            />
        </>
    )
}