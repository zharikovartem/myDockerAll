import { createBrowserRouter } from "react-router-dom";
import MainPage from "../Components/MainPage/MainPage";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "*",
        element: <>NotFound</>,
    },
])