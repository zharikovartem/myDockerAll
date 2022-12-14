import React from 'react'
import { Link } from 'react-router-dom'

type GoToUrlPropsType = {
    data: {
        id: number,
        brandItem: any
    }
}

const GoToUrl:React.FC<GoToUrlPropsType> = (props) => {

    console.log('GoToUrl props', props)

    return (
        <Link to={'/map?lat='+props.data.brandItem.latitude+'&lng='+props.data.brandItem.longitude+'&zoom=18'}>GoToUrl</Link>
    )
}

export default  GoToUrl