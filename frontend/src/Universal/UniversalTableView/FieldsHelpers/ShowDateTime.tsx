import moment from 'moment'
import React from 'react'

type ShowDateTimePropsType = {
    data: any,
    name: string
}

const ShowDateTime:React.FC<ShowDateTimePropsType> = (props) => {

    const date = moment(props.data[props.name])

    return (
        <>
            {date.format('hh:mm:ss DD-MM-YY')}
        </>   
    )
}

export default  ShowDateTime