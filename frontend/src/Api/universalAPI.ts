import { instance, url } from './Api'

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
    }
}