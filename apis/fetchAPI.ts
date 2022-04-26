import { IFetch } from '@type/API'
import promiseHandlerAPI from './promiseHandlerAPI'

const getValueByContentType = (response: any) => {
    const isContentJson = response?.headers?.get('content-type')?.indexOf('application/json') !== -1
    const isContentText = response?.headers?.get('content-type')?.indexOf('application/text') !== -1

    if (isContentJson) return response.json()
    else if (isContentText) return response.text()
    else return response
}

const fetchAPI = ({ input, callbackSuccess, callbackError }: IFetch) => {
    const getDataValue = (response: any) => {

        if (Array.isArray(response)) {
            return Promise.all(response.map(item => getValueByContentType(item)))
        } else {
            return getValueByContentType(response)
        }
    }

    
    promiseHandlerAPI({ 
        action: async () => {
            if (Array.isArray(input)) {
                return await Promise.all(input.map((value: RequestInfo) => fetch(value)))
            } else {
                return await fetch(input)
            }
        },
        callbackSuccess: async (response: any) => callbackSuccess && callbackSuccess(await getDataValue(response)),
        callbackError: async (response: any) => callbackError && callbackError(await getDataValue(response))
    })
}

export default fetchAPI