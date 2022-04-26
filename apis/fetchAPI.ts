import { IFetch } from '@type/API'
import promiseHandlerAPI from './promiseHandlerAPI'

const fetchAPI = ({ input, callbackSuccess, callbackError }: IFetch) => {
    
    promiseHandlerAPI({ 
        action: async () => {
            if (Array.isArray(input)) {
                return await Promise.all(input.map((value: RequestInfo) => fetch(value)))
            } else {
                return await fetch(input)
            }
        },
        callbackSuccess: async (response: any) => {
            if (!callbackSuccess) return

            if (Array.isArray(response)) {
                const textType = response.find(value => value.headers.get('content-type')?.indexOf('application/json') === -1)
                if (textType) return callbackError && callbackError(await textType.text())
                else return callbackSuccess(await Promise.all(response.map(value => value.json())))
            } else {
                if (response.headers.get('content-type')?.indexOf('application/json') !== -1) return callbackSuccess(await response.json())
                else return callbackError && callbackError(await response.text())
            }
        }, callbackError
    })
}

export default fetchAPI