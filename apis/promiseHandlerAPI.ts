import { IPromise } from "@type/API"

const promiseHandler = async ({ action, callbackSuccess, callbackError }: IPromise) => {
    try {
        const response = await action()
        callbackSuccess && callbackSuccess(response)
        console.log('promiseHandler: ', response)        
    } catch (error) {
        callbackError && callbackError(error)
        console.log('promiseHandler error: ', error)
    }
}

export default promiseHandler