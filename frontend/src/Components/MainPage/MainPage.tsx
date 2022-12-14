import { Spin } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectIsAuth } from '../../Redux/Selectors/authSelector'
import LoginForm from '../Login/LoginForm'

type MainPagePropsType = {

}

const MainPage: React.FC<MainPagePropsType> = (props) => {

    return (
        <>
            <h1>Main Page</h1>
            <h3>Parsers list:</h3>
            <li>Onliner</li>
        </>
    )
}

export default MainPage
