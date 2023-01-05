import { instance } from "../../Api/Api"
import { prepearFilterParams } from "../Helpers/prepearFilterParams"

export const universalAPI = {
    getAllItems(name: string) {
        return instance.get(`/api/${name}_get_all`,)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    getItems(name: string, query: any) {
        let stringified: string = prepearFilterParams(query, 'api');
        return instance.get(`/api/${name}${stringified}`,)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    updateItem(field: string, id: number, item: any) {
        const mappedItem = objectsToId(item)
        return instance.patch('/api/' + field + '/' + id, mappedItem)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    createItem(field: string, item: any) {
        return instance.post('/api/' + field, item)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    deleteItem(field: string, id: number) {
        return instance.delete('/api/' + field + '/' + id)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    uploadFile(file: any) {
        console.log('uploadFile', file)
        var formData = new FormData();
        formData.append("file", file);
        formData.append("path", 'brand_items');

        return instance.post('/api/files', formData, 
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apikey'),
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json"
            }
        }
        )
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    }
}

type ObjectType = {
    [key: string]: any
}

const mappedArray = [
    'category', 'address', 'owner', 'currencies', 'phoneNumbers', 'logoFile', 'imageFiles', 'additionalImageFiles', 'tags', 
    'imageFile'
]

export const objectsToId = (object: ObjectType) => {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if (mappedArray.includes(key)) {
                if(object[key]) {
                    if (object[key].id) {
                        object[key] = object[key].id
                    } else if (Array.isArray(object[key])) {
                        object[key].forEach( (item: any, index: number) => {
                            if (item.id) {
                                object[key][index] = item.id
                            }
                        })
                    }
                } else {
                    delete object[key]
                }
            }
            if (typeof object[key] !== 'boolean' && !object[key]) {
                delete object[key]
            }
        }
    }
    return object
}