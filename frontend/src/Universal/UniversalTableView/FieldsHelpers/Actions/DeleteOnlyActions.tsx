import { Button } from 'antd'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { ObjectDataType, QueryParamsType } from '../../UniversalTableView'
// import { deleteCurrentItem } from '../../../../Redux/adminReducer'
import { useAppDispatch } from "../../../../Redux/store";

type ActionsPropsType = {
    objectData: ObjectDataType
    data: {
        id: number
    }
    paginationParams: QueryParamsType
    refreshData: ()=>void
}

const DeleteOnlyActions: React.FC<ActionsPropsType> = (props) => {

    const dispatch = useAppDispatch()

    const onDeleteClick = () => {
        console.log('onDeleteClick', props)

        // dispatch(deleteCurrentItem(
        //     props.objectData.fieldName, 
        //     props.data.id,
        //     props.paginationParams,
        // ))

        props.refreshData()
    }

    return (
        <>
            <Button
                type='primary'
                danger
                shape='round'
                onClick={() => onDeleteClick()}
            >
                <DeleteIcon />
            </Button>
        </>
    )
}

export default DeleteOnlyActions