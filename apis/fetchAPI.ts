import { IFetch } from "@type/API"
import promiseHandlerAPI from "./promiseHandlerAPI"

const fetchAPI = ({ input, callbackSuccess, callbackError }: IFetch) => {
    
    promiseHandlerAPI({ action: async () => await fetch(input), callbackSuccess: async (response: any) => {
        if (callbackSuccess) {
            const data = await response.json()
            callbackSuccess(data)
        }
    }, callbackError })
}

export default fetchAPI