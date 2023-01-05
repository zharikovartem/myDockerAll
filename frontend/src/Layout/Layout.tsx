import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

type LayoutPropsType = {
    isWithoutFooter?: boolean
    children?: ReactNode
}

const Layout:React.FC<LayoutPropsType> = (props) => {

    return (
        <div className='wrapper'>
            <Header/>
            <main id='main'
                // className={cn(location.pathname !== '/admin' ? styles.main : '', 'main')}
            >
                <Outlet />
                {props.children}
            </main>
            {props.isWithoutFooter && <>Footer</>}
        </div>
    )
}

export default  Layout