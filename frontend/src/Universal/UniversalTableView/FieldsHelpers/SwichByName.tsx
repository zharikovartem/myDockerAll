import { Switch } from '@mui/material'
import { FC, useEffect, useState } from 'react'

type SwichByNamePropsType = {
    data: any,
    name: string
    action: (targetId: number, fieldName?: string, value?: any) => void
}

export const SwichByName: FC<SwichByNamePropsType> = (props) => {

    const [checked, setChecked] = useState<boolean>(props.data[props.name] ? true : false)
    const [isLoad, setIsLoad] = useState<boolean>(false)

    useEffect(() => {
        if (isLoad) {
            console.log('!!!', props.name, '=', props.data[props.name])
            setIsLoad(false)
        }
        setChecked(props.data[props.name] ? true : false)
    }, [props.data[props.name]]);

    return (
        <Switch
            disabled={isLoad}
            checked={checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                props.action(props.data.id, props.name, checked)
                setIsLoad(true)
            }}
        />
    )
}