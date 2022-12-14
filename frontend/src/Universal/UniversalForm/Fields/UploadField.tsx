import { Upload } from 'antd'
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { url } from '../../../Api/Api';

type UploadFieldPropsType = {
    value: string | string[] | UploadFile<any>[]
    onChange: (value: UploadFile[]) => void
    maxImageCount: number
    id?: string
}

const UploadField:React.FC<UploadFieldPropsType> = (props) => {

    const [fileList, setFileList] = useState<UploadFile[]>(getFileList(props.value))
    const [previewOpen, setPreviewOpen] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')

    useEffect(() => {
        console.log('UploadField value !!!useEffect ', props.id , props.value)
        console.log('UploadField value ???useEffect ', props.id , fileList)
        
        let needToUpdate = false

        if (Array.isArray(props.value)) {
            console.log('props.value isArray', props.value)

            props.value && props.value.length === 0 && setFileList([])
            
            props.value.forEach( (file: any, index: number) => {
                console.log('file', file)
                if (!fileList[index]) {
                    console.log('props.value isArray 1')
                    needToUpdate = true
                }
                //@ts-ignore
                else if (fileList[index] && file.filename !== fileList[index].filename) {
                    console.log('props.value isArray 2')
                    needToUpdate = true
                } else if (fileList[index] && file.status !== fileList[index].status){
                    console.log('props.value isArray 3')
                    needToUpdate = true
                } 
                else {
                    console.log('props.value isArray 4')
                    if (fileList.length > props.value.length) needToUpdate = true
                }
            })
        } else {
            // console.log('To parts', Array.isArray(props.value))
            //@ts-ignore
            if (props.value === '') {
                setFileList([])
            } else if (props.value) {
                console.log('UploadField fileList 1', fileList)
                //@ts-ignore
                const parts = props.value.split('/')
                setFileList([])
                setFileList( [{
                    uid: '-1',
                    name: parts[parts.length-1],
                    status: 'done',
                    url: url + props.value,
                }])
            } else {
                setFileList([])
            }
        }

        needToUpdate && setFileList(getFileList(props.value)) // : alert('false')

    }, [props.value])

    useEffect(() => {
        console.log('UploadField fileList 2', fileList)
    }, [fileList]);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    }

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log('newFileList', newFileList)
        props.onChange(newFileList)
    }

    return (
        <>

            { fileList && fileList[0] && fileList[0].name}

            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {props.maxImageCount > fileList.length && uploadButton}
            </Upload>
        </>
    )
}

export default  UploadField

const getFileList = (fileList: string | string[] | UploadFile<any>[]):UploadFile[] => {
    console.log('getFileList', typeof fileList, fileList)
    if (Array.isArray(fileList)) {
        return fileList.map( (i, index) => {
            // alert(1)
            if (typeof i === 'string') {
                const parts = i.split('/')
                return {
                    uid: '-'+index,
                    name: parts[parts.length-1],
                    status: 'done',
                    url: url + i
                }
            // @ts-ignore
            } else if (i.filename) {
                // @ts-ignore
                console.log('else', i.filename, i)
                return {
                    ...i,
                    // @ts-ignore
                    url: url + i.filename
                }
            }
            return i
        })
    } else if (fileList === '') {
        return []
    } else if(!fileList) {
        return []
    } else if (typeof fileList === 'string') {
        console.log('fileList', fileList)
        console.log('fileList', typeof fileList)
        const parts = fileList.split('/')
        // alert(2)
        return [{
            uid: '-1',
            name: parts[parts.length-1],
            status: 'done',
            url: url + fileList,
        }]
    } else {
        return []
    }
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
})