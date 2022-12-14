import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { routers } from './Routers';
import { useAppDispatch } from '../Redux/store';
import { selectIsAuth } from '../Redux/Selectors/authSelector';
import { checkAuth } from '../Redux/authReducer';

// const useAppDispatch: () => AppDispatch = useDispatch

const RouterComponent: React.FC = () => {

    const dispatch = useAppDispatch()

    // const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    return (
        <RouterProvider router={routers} />
        // <>RouterProvider</>
    )
}

export default RouterComponent

