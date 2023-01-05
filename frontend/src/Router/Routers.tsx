import { createBrowserRouter } from "react-router-dom"
import MainPage from "../Components/MainPage/MainPage"
import Parsers from "../Components/Parsers/Parsers"
import ToDo from "../Components/ToDo/ToDo"
import Layout from "../Layout/Layout"

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <MainPage/>,
            },
            {
                path: "/parsers",
                element: <Parsers/>,
            },
            {
                path: "/to_do",
                element: <ToDo/>,
            },
            
        ]
    },
    
])