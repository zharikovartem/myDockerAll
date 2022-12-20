import React from 'react'

type ToDoPropsType = {
    
}

const ToDo:React.FC<ToDoPropsType> = (props) => {

    return (
        <>
            <h1>ToDo</h1>

            <li>1. Запустить команду из контроллекра</li>
            <li>1.1. Универсальный эндпойнт для запуска команд</li>
            
        </>
    )
}

export default  ToDo