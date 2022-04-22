import { IFetch } from "@type/API"
import promiseHandler from "./promiseHandlerAPI"

const fetchAPI = async ({ input, callbackSuccess, callbackError }: IFetch) => {
    promiseHandler( { action: async () => {
        const response = await fetch(input)
        return await response.json()
    }, callbackSuccess, callbackError })
}

export default fetchAPI