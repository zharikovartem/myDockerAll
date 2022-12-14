import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../Redux/store'
import { getAllItems } from '../../Universal/Redux/universalReducer'
import { selectCurrentAllListCount, selectCurrentAllList } from '../../Universal/Redux/universalSelector'
import UniversalTableView from '../../Universal/UniversalTableView/UniversalTableView'

type MainPagePropsType = {

}

const MainPage: React.FC<MainPagePropsType> = (props) => {

    const dispatch = useAppDispatch()

    const catalogs = useSelector(selectCurrentAllList('catalogs'))
    const catalogsCount = useSelector(selectCurrentAllListCount('catalogs'))

    useEffect(() => {
        dispatch(getAllItems('catalogs'))
    }, [])

    return (
        <>
            <h1>Main Page</h1>
            <h3>Parsers list:</h3>
            <li>Onliner (count: {catalogs && catalogs.length}/{catalogsCount && catalogsCount})</li>

            <UniversalTableView
                objectData={{
                    fieldName: 'catalogs',
                    defaultParams: {
                        page: 1,
                        perPage: 15
                    }
                }}
                fields={[
                    { label: 'Id', name: 'id' },
                    { label: 'Name', name: 'name' },
                    { label: 'Url', name: 'url' },
                    { label: 'parent', name: 'parent' },
                ]}
                headActions={<></>}
                tableName='catalogs'
                
            />


            <h3>To Do</h3>
            <li>base entity</li>
        </>
    )
}

export default MainPage
