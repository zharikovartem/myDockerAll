import React from 'react'
import LoginForm from '../Login/LoginForm'

type MainPagePropsType = {
    
}

const MainPage:React.FC<MainPagePropsType> = (props) => {

    return (
        <>
            <h1>MainPage</h1>
            <p>Username: admin@admin.com</p>
            <p>Password: 12345678</p>
            <LoginForm />
            <br/>

            <ul>
                <li>(done)Создать дэфолтного юзера</li>
                <li>Реализовать логин и регистрацию</li>
                <li>Сделать базовое меню</li>
                <li>Вывести базовый функционал</li>
            </ul>

            <ul>
                <li>Api-platform</li>
            </ul>
        </>
    )
}

export default  MainPage