import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { routers } from './Routers';
import { Spinner } from '../Elements/Spinner/Spinner';
import { AppInitialStateType, getStatusApp } from '../Redux/appReducer';
import { AppStateType } from '../Redux/store';
// import { useAppDispatch, useAppSelector } from '../Hooks/hooks';

// const useAppDispatch: () => AppDispatch = useDispatch

const RouterComponent: React.FC = () => {
    // const dispatch = useAppDispatch()

    // const { isInitialized } = useAppSelector(state => state.appReducer)
    // const [isInitialized, setIsInitialized] = useState<boolean>(false)

    // useEffect(() => {
    //     // @ts-ignore
    //     dispatch(getStatusApp())
    // }, [])

    // if ( !isInitialized ) {
    //     return (
    //         <Spinner/>
    //     )
    // }

    return (
        <RouterProvider router={routers} />
        // <>RouterProvider</>
    )
}

export default RouterComponent

