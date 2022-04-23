import { IPromise } from "@type/API"

const promiseHandlerAPI = async ({ action, callbackSuccess, callbackError }: IPromise) => {
    try {
        const response = await action()
        callbackSuccess && callbackSuccess(response)
    } catch (error) {
        console.log('promiseHandler error: ', error)
        callbackError && callbackError(error)
    }
}

export default promiseHandlerAPI