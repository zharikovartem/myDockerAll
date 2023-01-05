import { Button, Form, FormInstance, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { modalActions } from '../../Redux/modalReducer'
// import { selectCurrentList } from '../../Redux/selectors/adminSelector'
// import { silectModalIsOpen } from '../../Redux/selectors/modalSelector'
import { AppStateType, useAppDispatch } from '../../Redux/store'
import UniversalForm from '../UniversalForm/UniversalForm'
import { FormFieldsType } from '../UniversalTableView/UniversalTableViewTypes'

export type UniversalModalFormPropsType = {
    isLoad: boolean
    item?: any
    key: string
    onSubmit: ()=>void
    form: FormInstance<any>
}



type UniversalModalPropsType = {
    children: React.FC<UniversalModalFormPropsType> | 'universal'
    fields?: FormFieldsType[]
    fieldName: string
    title: string
    onSubmit?: ()=>void
    buttonText?: string
    selector?: (state: AppStateType) => any
}

const UniversalModal:React.FC<UniversalModalPropsType> = (props) => {

    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const [isOpen, setIsOpen] = useState<boolean | number>(false)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [target, setTarget] = useState<any>()

    // const modalData = useSelector(silectModalIsOpen)
    // const itemsList = useSelector(props.selector ? props.selector : selectCurrentList(props.fieldName))

    // useEffect(() => {
    //     setIsOpen(modalData[props.fieldName])
    //     if (typeof modalData[props.fieldName] === 'number') {
    //         itemsList && setTarget(itemsList.find( (i: any) => i.id === modalData[props.fieldName]))
    //     }
    // }, [modalData])

    // useEffect(() => {
    //     isOpen && itemsList && setTarget(itemsList.find( (i: any) => i.id === modalData[props.fieldName]))
    // }, [isOpen])

    const onCancel = () => {
        if (typeof isOpen !== 'boolean') {
            // dispatch(modalActions.setModalOpen(props.fieldName, false))
        } else {
            setIsOpen(false)
        }
        // form.setFieldsValue({})
    }

    const onSubmit = () => {
        setIsOpen(false)
        // form.setFieldsValue({})
    }

    return (
        <>
            <Button 
                type="primary"
                onClick={()=>{
                    // form.setFieldsValue({})
                    setIsOpen(true)
                }}
            >
                {props.buttonText ? props.buttonText : 'Add'}
            </Button>
        
            <Modal
                title={ typeof isOpen === 'boolean' ? 'Create '+ props.title : 'Edit ' + props.title}
                open={!!isOpen}
                onOk={form.submit}
                onCancel={onCancel}
                width={'100%'}
            >
                <>
                    {props.children !== 'universal' ? 
                        <props.children
                            isLoad={isLoad}
                            item={target}
                            onSubmit={onSubmit}
                            key={props.title}
                            form={form}
                        />
                        :
                        props.fields ? 
                            <UniversalForm 
                                form={form}
                                fields={props.fields}
                                item={target}
                                key='UniversalForm'
                                fieldName={props.fieldName}
                            /> 
                            :
                            <></>
                    }
                </>
            </Modal>

        </>
    )
}

export default  UniversalModal