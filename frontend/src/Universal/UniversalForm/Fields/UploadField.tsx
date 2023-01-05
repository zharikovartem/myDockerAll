import { PlusOutlined } from '@ant-design/icons'
import { Upload, UploadFile, UploadProps } from 'antd'
import React from 'react'
import { url } from '../../../Api/Api'

export type ValueType = {
    id?: number
    filename: string
    isNew?: boolean
    originFileObj?: File
}[]

type UploadFieldPropsType = {
    value: ValueType
    maxImageCount: number
    onChange: (value: ValueType) => void
}

const UploadField:React.FC<UploadFieldPropsType> = (props) => {

    console.group('UploadField')
        console.log('props', props)
    console.groupEnd()

    const getFileList = (value: ValueType): UploadFile<any>[] => {
        console.log('UploadField getFileList', value)
        return value.map( item => {
            // console.log('UploadField getFileList item', item)
            return({
                uid: item.id ? item.id.toString() : '0',
                name: item.filename,
                status: 'done',
                url: url + item.filename,
                // @ts-ignore
                file: item.originFileObj ? item.originFileObj : item.file,
                // @ts-ignore
                originFileObj: item.originFileObj ? item.originFileObj : item.file
            })
        })
    }

    const getValues = (fileList: UploadFile<any>[]): ValueType => {
        console.log('UploadField getValues', fileList)
        return fileList.map( file => {
            // console.log('UploadField getValues file', file)
            if (!parseInt(file.uid)) {
                return {
                    filename: file.name,
                    isNew: true,
                    originFileObj: file.originFileObj
                }
            } else {
                return {
                    id: +file.uid,
                    filename: file.name,
                    originFileObj: file.originFileObj
                }
            }
        })
    }

    const handlePreview = async (file: UploadFile) => {
        // if (!file.url && !file.preview) {
        //     file.preview = await getBase64(file.originFileObj as RcFile);
        // }

        // setPreviewImage(file.url || (file.preview as string));
        // setPreviewOpen(true);
        // setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    }

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log('newFileList', newFileList)
        props.onChange(getValues(newFileList))
    }

    return (
        <Upload
            listType="picture-card"
            fileList={getFileList(props.value)}
            // customRequest={()}
            beforeUpload={()=>{return false}}
            onPreview={handlePreview}
            onChange={handleChange}
        >
            {props.maxImageCount > props.value.length && uploadButton}
        </Upload>
    )
}

export default  UploadField

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
)