import React, { useEffect, useState } from 'react'
import SunEditor from 'suneditor-react'
import { FormDataType } from '../UniversalForm'

type SunEditorFieldPropsType = {
    value: string
    name: string
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
    formData: FormDataType
}

const SunEditorField:React.FC<SunEditorFieldPropsType> = (props) => {

    const [newFormData, setNewFormData] = useState<FormDataType>(props.formData)

    useEffect(() => {
        console.log('onSunEditorChange useEffect', props.formData)
        setNewFormData(props.formData)
    }, [props.formData])

    const onSunEditorChange = (content: string) => {
        console.log('onSunEditorChange 1', content)
        console.log('onSunEditorChange 2', props.formData)
        console.log('onSunEditorChange 3', newFormData)

        const formData = {...props.formData}
        formData[props.name] = content
        console.log('sunEditorData 3', formData)
        props.setFormData(formData)
    }

    return  <SunEditor
                defaultValue={props.value}
                setContents={props.value}
                onChange={onSunEditorChange}
            />
}

export default  SunEditorField