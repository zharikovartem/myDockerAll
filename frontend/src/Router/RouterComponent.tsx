import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { routers } from './Routers'
import { useAppDispatch } from '../Redux/store'
import { selectIsAuth } from '../Redux/Selectors/authSelector'
import { checkAuth } from '../Redux/authReducer'
import LoginForm from '../Components/Login/LoginForm'
import { Spin } from 'antd'
import Header from '../Components/Header/Header'
import styled from 'styled-components'

const RouterComponent: React.FC = () => {

    const dispatch = useAppDispatch()

    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    if (isAuth === undefined) {
        return <div
            style={{
                marginTop: 150,
                marginLeft: '48%'
            }}
        >
            <Spin size='large' />
        </div>
    }

    if (isAuth === false) {
        return (
            <>
                <h1>MainPage</h1>
                <p>Username: admin@admin.com</p>
                <p>Password: 12345678</p>
                <LoginForm />
                <br />

                <ul>
                    <li>Перейти в новый репозиторий</li>
                </ul>

                <ul>
                    <li>(done)Создать дэфолтного юзера</li>
                    <li>(done)Реализовать логин</li>
                    <li>Реализовать регистрацию</li>
                    <li>Сделать базовое меню</li>
                    <li>Вывести базовый функционал</li>
                </ul>

                <ul>
                    <li>(done)Api-platform</li>
                </ul>

                <ul>
                    <li>Web-sockets</li>
                </ul>

                <ul>
                    <li>Clean php</li>
                    <li>Clean js</li>
                    <li>Clean yaml</li>
                    <li>Clean packages</li>
                </ul>
            </>
        )
    } else {
        return (
            <>
                <Header />
                <Container className='container'>
                    <RouterProvider router={routers} />
                </Container>
            </>
        )
    }
}

export default RouterComponent

const Container = styled.div({
    maxWidth: 1366,
    width: '100%',
    margin: '0 auto'
})

