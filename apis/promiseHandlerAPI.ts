import { IPromise } from "@type/API"

const hasError = (response: any) => {
    const has = (value: any) => value?.ok === false

    if (Array.isArray(response)) {
        return response.some(item => has(item))
    } else {
        return has(response)
    }
}

const promiseHandlerAPI = async ({ action, callbackSuccess, callbackError }: IPromise) => {

    try {
        const response = await action()

        if (hasError(response)) callbackError && callbackError(response)
        else callbackSuccess && callbackSuccess(response)
    } catch (error) {
        callbackError && callbackError(error)
    }
}

export default promiseHandlerAPI