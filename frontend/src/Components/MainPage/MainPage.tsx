import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectIsAuth } from '../../Redux/Selectors/authSelector'
import { selectCurrentAllList, selectCurrentAllListCount } from '../../Redux/Selectors/universalSelector'
import { useAppDispatch } from '../../Redux/store'
import { getAllItems } from '../../Redux/universalReducer'
import LoginForm from '../Login/LoginForm'

type MainPagePropsType = {

}

const MainPage: React.FC<MainPagePropsType> = (props) => {

    const dispatch = useAppDispatch()

    const catalogs = useSelector(selectCurrentAllList('catalogs'))
    const catalogsCount = useSelector(selectCurrentAllListCount('catalogs'))

    useEffect(() => {
        dispatch(getAllItems('catalogs'))
    }, [])

    return (
        <>
            <h1>Main Page</h1>
            <h3>Parsers list:</h3>
            <li>Onliner (count: {catalogs && catalogs.length}/{catalogsCount && catalogsCount})</li>


            <h3>To Do</h3>
            <li>base entity</li>
        </>
    )
}

export default MainPage
