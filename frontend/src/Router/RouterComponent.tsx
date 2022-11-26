import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { routers } from './Routers';
import { Spinner } from '../Elements/Spinner/Spinner';

const RouterComponent: React.FC = () => {
    const dispatch = useDispatch();

    // const { isInitialized } = useSelector<AppStateType, AppInitialStateType>(state => state.appReducer)
    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    if ( !isInitialized ) {
        return (
            <Spinner/>
        )
    }

    return (
        <RouterProvider router={routers} />
    )
}

export default RouterComponent

