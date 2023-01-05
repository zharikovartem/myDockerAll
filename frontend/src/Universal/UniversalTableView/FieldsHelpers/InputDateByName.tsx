import { Input, Switch } from '@mui/material'
import moment from 'moment'
import { FC } from 'react'

type InputDateByNamePropsType = {
  data: any
  name: string
  action: (targetId: number, fieldName?: string, value?: any) => void
}

export const InputDateByName: FC<InputDateByNamePropsType> = (props) => {
    props.data[props.name] && console.log('InputDateByName: ', props)
  return (
    <Input
        type='date'
        defaultValue={props.data[props.name] ? moment(props.data[props.name]).format("YYYY-MM-DD") : undefined}
        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {
            // props.action(props.data.id, props.name, moment(event.target.value).unix())
            props.action(props.data.id, props.name, moment(event.target.value).format("YYYY-MM-DD"))
        }}
      />
  )
}