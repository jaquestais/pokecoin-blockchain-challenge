import { IFetch } from "@type/API"
import promiseHandlerAPI from "./promiseHandlerAPI"

const fetchAPI = ({ input, callbackSuccess, callbackError }: IFetch) => {
    
    promiseHandlerAPI({ 
        action: async () => {
            if (Array.isArray(input)) {
                return await Promise.all(input.map(value => fetch(value)))
            } else {
                return await fetch(input)
            }
        },
        callbackSuccess: async (response: any) => {
        if (callbackSuccess) {
            let data

            if (Array.isArray(response)) {
                data = await Promise.all(response.map(value => value.json()))
            } else {
                data = await response.json()
            }
            
            callbackSuccess(data)
        }
    }, callbackError })
}

export default fetchAPI