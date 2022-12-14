import { prepearFilterParams } from '../Universal/Helpers/prepearFilterParams'
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
    }
}