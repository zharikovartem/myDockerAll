import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

type InputFieldPropsType = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField:React.FC<InputFieldPropsType> = (props) => {

    const [value, setValue] = useState<string>(props.value)

    useEffect(() => {
        // alert(props.value)
        setValue(props.value)
    }, [props.value])

    return (
        <Input
            value={value}
            onChange={props.onChange}
        />
    )
}

export default  InputField