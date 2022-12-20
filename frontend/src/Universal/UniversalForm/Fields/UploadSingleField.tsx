import { PlusOutlined } from '@ant-design/icons'
import { Upload, UploadFile, UploadProps } from 'antd'
import React from 'react'
import { url } from '../../../Api/Api'

export type SingleValueType = {
    id?: number
    filename: string
    isNew?: boolean
    originFileObj?: File
} | undefined

type UploadFieldPropsType = {
    value: SingleValueType
    maxImageCount: number
    onChange: (value: SingleValueType) => void
}

const UploadSingleField:React.FC<UploadFieldPropsType> = (props) => {

    console.group('UploadSingleField')
        console.log('props', props)
    console.groupEnd()

    const getFileList = (value: SingleValueType): UploadFile<any>[] => {
        console.log('UploadSingleField value', value)
        if (value) {
            return([{
                uid: value.id ? value.id.toString() : '0',
                name: value.filename,
                status: 'done',
                url: url + value.filename,
                // @ts-ignore
                file: value.originFileObj ? value.originFileObj : value.file,
                // @ts-ignore
                originFileObj: value.originFileObj ? value.originFileObj : value.file
            }])
        } else {
            return []
        }
        
    }

    const getValues = (fileList: UploadFile<any>[]): SingleValueType => {
        console.log('UploadSingleField getValues', fileList)
        if (fileList[0]) {
            if (!parseInt(fileList[0].uid)) {
                return {
                    filename: fileList[0].name,
                    isNew: true,
                    originFileObj: fileList[0].originFileObj
                }
             } else {
                return {
                    id: +fileList[0].uid,
                    filename: fileList[0].name,
                    originFileObj: fileList[0].originFileObj
                }
            }
        } else {
            return undefined
        }
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
        <>
            UploadSingleField
            
            <Upload
                listType="picture-card"
                fileList={getFileList(props.value)}
                // customRequest={()}
                beforeUpload={()=>{return false}}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {!props.value && uploadButton}
            </Upload>

        </>
    )
}

export default  UploadSingleField

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
)