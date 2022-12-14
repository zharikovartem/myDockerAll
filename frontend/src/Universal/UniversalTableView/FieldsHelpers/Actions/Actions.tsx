import { Button } from 'antd'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
// import { modalActions } from '../../../../Redux/modalReducer'
import { ObjectDataType, QueryParamsType } from '../../UniversalTableView'
// import { deleteCurrentItem } from '../../../../Redux/adminReducer'
import { useAppDispatch } from "../../../../Redux/store";


type ActionsPropsType = {
    objectData: ObjectDataType
    data: any
    paginationParams: QueryParamsType
    refreshData: ()=>void
}

const Actions: React.FC<ActionsPropsType> = (props) => {

    const dispatch = useAppDispatch()

    const onEditClick = () => {
        console.log('onEditClick', props)
        // dispatch(modalActions.setModalOpen(props.objectData.fieldName, props.data.id))
    }

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
                style={{ marginRight: 20 }}
                type='primary'
                shape='round'
                onClick={() => onEditClick()}
            >
                <EditIcon />
            </Button>
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

export default Actions