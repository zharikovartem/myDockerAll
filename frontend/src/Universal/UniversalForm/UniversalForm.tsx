import { ConfigProvider, DatePicker, Form, FormInstance, Input, InputNumber, Switch } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import dayjs from 'dayjs'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
// import { createCurrentItem, updateCurrentItem } from '../../Redux/adminReducer'
import { useAppDispatch } from '../../Redux/store'
// import { UploadDataType } from '../../Redux/uploadReducer'
import { FormFieldsType } from '../UniversalTableView/UniversalTableViewTypes'
import DependedSelectField from './Fields/DependedSelectField'
import DependedSelectWithAdd from './Fields/DependedSelectWithAdd'
import InputField from './Fields/InputField'
import SelectField from './Fields/SelectField'
import UploadField, { ValueType } from './Fields/UploadField'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import 'dayjs/locale/es-us';
import locale from 'antd/locale/en_US';
import SunEditorField from './Fields/SunEditorField'
import UploadSingleField, { SingleValueType } from './Fields/UploadSingleField'
import { updateItem, createItem } from '../Redux/universalReducer'

dayjs.extend(customParseFormat)

const layout = {
    labelCol: { span: isMobile ? 24 : 8 },
    wrapperCol: { span: isMobile ? 24 : 16 },
}

const dateFormat = 'YYYY/MM/DD';

export type FormDataType = {
    [key: string]: any
}
export type FormUploadDataType = {
    [key: string]: ValueType | SingleValueType
}

export type UniversalFirmFieldType = 'input' | 'inputNumber' | 'checkbox' | 'select' | 'dependedSelect' | 'innerForm' 
    | 'upload' | 'textArea' | 'SunEditor' | 'inputDate'

export type RulezType = 'required' | 'email'

type UniversalFormPropsType = {
    fields: FormFieldsType[]
    form?: FormInstance<any>
    item?: any
    fieldName: string

    // InnerForm props: 
    isInnerForm?: boolean
    setChanges?: (formdata: FormDataType) => void
    onFinish?: (values: any) => void
}

const UniversalForm: React.FC<UniversalFormPropsType> = (props) => {

    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const generateFormData = () => {
        const newFormData: FormDataType = {}
        props.item && props.fields.forEach(field => {
            if (typeof props.item[field.name] === 'object') {
                if (field.type !== 'upload') {
                    if (Array.isArray(props.item[field.name])) {
                        newFormData[field.name] = props.item[field.name] && props.item[field.name].id ? props.item[field.name].id : props.item[field.name]
                    } else {
                        newFormData[field.name] = props.item[field.name]
                    }
                } else {
                    if (Array.isArray(props.item[field.name])) {
                        newFormData[field.name] = props.item[field.name].map((i: any) => i.filename)
                    } else {
                        if (props.item[field.name]) {
                            newFormData[field.name] = props.item[field.name].filename
                        } else {
                            newFormData[field.name] = []
                        }

                    }
                }
            } else {
                newFormData[field.name] = props.item ? props.item[field.name] : ''
            }
        })
        return newFormData
    }

    const [formData, setFormData] = useState<FormDataType>(generateFormData())
    const [dependsFormData, setDependsFormData] = useState<FormDataType>()
    // const [uploadData, setUploadData] = useState<UploadDataType>()
    const [uploadData, setUploadData] = useState<any>()
    const [isInitFormData, setIsInitFormData] = useState<'init' | 'first' | 'second'>('init')

    const [sunEditorData, setSunEditorData] = useState<{[key: string]: string}>({})
    useEffect(() => {
        console.log('sunEditorData sunEditorData', sunEditorData)
        console.log('sunEditorData formData', formData)

        const newFormData = {
            ...formData,
            ...sunEditorData
        }

        console.log('sunEditorData newFormData', newFormData)

        setFormData(newFormData)

    }, [sunEditorData]);

    useEffect(() => {
        !props.isInnerForm && console.log('useEffect props.item: ', props.item ? props.item.id : props.item)
        !props.isInnerForm && console.log('useEffect props.item: ', generateFormData())
        console.log('setFormData: 1')
        setFormData(generateFormData())
        // !props.item && props.form && props.form.setFieldsValue({})

        isInitFormData !== 'second' && setIsInitFormData('init')
    }, [props.item])

    // useEffect(() => {
    //     console.log('useEffect for dependsFormData', dependsFormData)
    // }, [dependsFormData])

    useEffect(() => {
        if (props.isInnerForm && props.setChanges && isInitFormData !== 'init') {
            props.setChanges({
                ...formData,
                isViewMap: isInitFormData !== 'first',
                id: props.item ? props.item.id : undefined
            })
        } else {
            // props.form && props.form.setFieldsValue(formData)
        }
        setIsInitFormData(isInitFormData === 'init' ? 'first' : 'second')
    }, [formData])

    const getRulesToItem = (rules?: RulezType[]) => {
        type RulesArrayType = {
            [key: string]: any
        }
        const rulesArray: RulesArrayType[] = []

        if (rules) {
            rules.forEach(rule => {
                switch (rule) {
                    case 'required':
                        rulesArray.push({ required: true })
                        break;

                    default:
                        break;
                }
            })
        }

        return rulesArray
    }

    const onSunEditorChange = (content: string) => {
        console.log('onSunEditorChange', content)
        console.log('onSunEditorChange', formData)
    }

    const choiseFormItemType = (field: FormFieldsType) => {
        switch (field.type) {
            case 'isOwner':
                return (
                    <Switch
                        checked={formData[field.name]}
                        onChange={(checked: boolean) => {
                            const newFormData: FormDataType = { ...formData }
                            if (checked) {
                                newFormData[field.name] = field.userData ? field.userData.id as number : undefined
                            } else {
                                newFormData[field.name] = undefined
                            }
                            console.log('setFormData: 2', newFormData)
                            setFormData(newFormData)
                        }}
                    />
                )

            case 'inputDate': 
                console.log('DatePicker', dayjs(formData[field.name], 'YYYY-MM-DD'))
                return(
                    <ConfigProvider locale={locale}>
                        <DatePicker 
                            value={dayjs(formData[field.name], 'YYYY-MM-DD').isValid() 
                                ? dayjs(formData[field.name], 'YYYY-MM-DD') 
                                : dayjs('2022-12-05', 'YYYY-MM-DD')}
                            format={'YYYY-MM-DD'}
                            // locale={locale}
                            onChange={
                                (value: any | null, dateString: string) => {
                                    dateString = dateString
                                    console.log('dateString', dateString)
                                    const newFormData: FormDataType = { ...formData }
                                    newFormData[field.name] = dateString
                                    console.log('setFormData: 3', newFormData)
                                    setFormData(newFormData)
                                }
                            }
                        />
                    </ConfigProvider>
                )

            case 'input':
                return (
                    <InputField
                        value={formData[field.name] ? formData[field.name] : ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const newFormData: FormDataType = { ...formData }
                            newFormData[field.name] = event.target.value
                            console.log('setFormData: 4', newFormData)
                            setFormData(newFormData)
                        }}
                    />
                )

            case 'checkbox':
                return <Switch
                    checked={formData[field.name]}
                    onChange={(checked: boolean) => {
                        const newFormData: FormDataType = { ...formData }
                        newFormData[field.name] = checked
                        console.log('setFormData: 5', newFormData)
                        setFormData(newFormData)
                    }}
                />

            case 'inputNumber':
                return <InputNumber
                    value={formData[field.name]}
                    style={{ width: '100%' }}
                    onChange={(value: number | null) => {
                        const newFormData: FormDataType = { ...formData }
                        newFormData[field.name] = value
                        console.log('setFormData: 6', newFormData)
                        setFormData(newFormData)
                    }}
                />

            case 'select':
                return field.optionsGetter ?
                    <SelectField
                        selector={field.optionsSelector}
                        getter={field.optionsGetter}
                        value={formData[field.name]}
                        targetField={field.targetField}
                        onChange={(value: string | number) => {
                            const newFormData: FormDataType = { ...formData }
                            newFormData[field.name] = value
                            console.log('setFormData: 7', newFormData)
                            setFormData(newFormData)
                        }}
                    />
                    :
                    <>No optionsSelector or optionsGetter</>

            case 'upload':
                if (Array.isArray(formData[field.name])) {
                    return <UploadField
                        value={formData[field.name]}
                        maxImageCount={field.maxImageCount ? field.maxImageCount : 1}
                        onChange={(value: ValueType) => {
                            const newUploadData = {...uploadData}
                            newUploadData[field.name] = value
                            setUploadData(newUploadData)
                            const newFormData: FormDataType = { ...formData }
                            newFormData[field.name] = value
                            setFormData(newFormData)
                        }}
                    />
                } else {
                    console.log('UploadSingleField!!!', formData)
                    return  <UploadSingleField
                                value={formData[field.name]}
                                maxImageCount={1}
                                onChange={(value: SingleValueType) => {
                                    const newUploadData = {...uploadData}
                                    newUploadData[field.name] = value
                                    setUploadData(newUploadData)
                                    const newFormData: FormDataType = { ...formData }
                                    newFormData[field.name] = value
                                    setFormData(newFormData)
                                }}
                            />
                }

            case 'textArea':
                return <Input.TextArea />

            case 'SunEditor': 
                return <SunEditorField
                            value={formData[field.name]}
                            formData={sunEditorData}
                            setFormData={setSunEditorData}
                            name={field.name}

                    // defaultValue={formData[field.name]}
                    // setContents={formData[field.name]}
                    // onChange={onSunEditorChange}
                    // onChange={(content: string) => {
                    //     const newFormData: FormDataType = { ...formData }
                    //     newFormData[field.name] = content
                    //     console.log('setFormData: 9', newFormData)
                    //     console.log('setFormData: 9-2', formData)
                    //     setFormData(newFormData)
                    // }}
                />

            case 'dependedSelectWithAdd': 
                return <DependedSelectWithAdd
                        selector={field.optionsSelector}
                        getter={field.optionsGetter}
                        value={formData[field.name]}
                        targetField={field.targetField}
                        updateFieldName={field.updateFieldName}
                        parrentId={field.parrentField ? formData[field.parrentField] : undefined}
                        onChange={(value: string | number | undefined) => {
                            const newFormData: FormDataType = { ...formData }
                            newFormData[field.name] = value
                            console.log('setFormData: 10', newFormData)
                            setFormData(newFormData)
                        }}
                    />
                    

            case 'dependedSelect':
                return field.optionsGetter ?
                    <DependedSelectField
                        selector={field.optionsSelector}
                        getter={field.optionsGetter}
                        value={formData[field.name]}
                        targetField={field.targetField}
                        parrentId={field.parrentField ? formData[field.parrentField] : undefined}
                        onChange={(value: string | number | undefined) => {
                            const newFormData: FormDataType = { ...formData }
                            newFormData[field.name] = value
                            console.log('setFormData: 11', newFormData)
                            setFormData(newFormData)
                        }}
                    />
                    :
                    <>No optionsGetter</>

            default:
                break;
        }
    }

    const getFormItems = () => {
        console.log('getFormItems!!!!!')
        // setFormBody(items)
        return props.fields.map(field => {
            if (field.type === 'innerForm') {
                return field.fields ?
                    <UniversalForm
                        key={field.name}
                        fields={field.fields}
                        // form={props.form}
                        item={props.item ? props.item[field.name] : undefined}
                        fieldName={props.fieldName}

                        isInnerForm
                        setChanges={(newFormData: FormDataType) => {
                            if (field.objectName && Object.keys(newFormData).length !== 0) {
                                const newDependsFormData = { ...dependsFormData }
                                newDependsFormData[field.objectName] = newFormData
                                newDependsFormData[field.objectName].singleFieldName = field.name
                                // newDependsFormData[field.name] = {...newFormData,  isChanged: true}
                                setDependsFormData(newDependsFormData)
                            }
                        }}
                        onFinish={onFinish}
                    />
                    :
                    <>No fields for inner form</>
            }
            return (
                <Form.Item
                    label={field.title}
                    name={field.name}
                    rules={getRulesToItem(field.rules)}
                >
                    {choiseFormItemType(field)}
                </Form.Item>
            )
        })
    }

    const onFinish = (values: any) => {
        props.onFinish && props.onFinish(values)

        console.group('onFinish')
        console.log('props.', props)
        console.log('values.', values)
        console.groupEnd()

        // Заменяем обьекты на id
        const valuesToInsert = { ...values }
        props.fields.forEach(field => {
            if (field.type === 'upload') {
                console.log('valuesToInsert[field.name]', valuesToInsert[field.name])
                valuesToInsert[field.name] = typeof valuesToInsert[field.name] === 'object' ? valuesToInsert[field.name].map((i: any) => i.id) : undefined
            }
        })

        if (props.item) {
            console.log('UPDATE')
            dispatch(updateItem(
                props.fieldName,
                {
                    ...valuesToInsert,
                    id: props.item.id
                },
                {},
                uploadData,
                dependsFormData
            ))

        } else {
            console.log('CREATE')
            dispatch(createItem(
                props.fieldName,
                valuesToInsert,
                {},
                uploadData,
                dependsFormData
            ))

        }
    }
    if (Object.keys(formData).length === 0) {
        props.form ? props.form.resetFields() : form.resetFields()
        // setIsInitFormData('init')
    } else {
        props.form ? props.form.setFieldsValue(formData) : form.setFieldsValue(formData)
    }

    return (
        <Form
            {...layout}
            name="control-hooks"
            onFinish={onFinish}
            form={props.form ? props.form : form}
            initialValues={formData}
            layout={isMobile ? "vertical" : "horizontal"}
        >
            {getFormItems()}
        </Form>
    )
}

export default UniversalForm

