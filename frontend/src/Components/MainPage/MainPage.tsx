import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../Redux/Selectors/authSelector'
import LoginForm from '../Login/LoginForm'

type MainPagePropsType = {
    
}

const MainPage:React.FC<MainPagePropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)

    if (!isAuth) {
        return (
            <>
                <h1>MainPage</h1>
                <p>Username: admin@admin.com</p>
                <p>Password: 12345678</p>
                <LoginForm />
                <br/>
    
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
            <>MainPage</>
        )
    }
    
}

export default  MainPage