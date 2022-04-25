interface IFetch {
    input: Array<RequestInfo | URL> | RequestInfo | URL,
    callbackSuccess?: Function,
    callbackError?: Function
}

interface IPromise {
    action:  Function,
    callbackSuccess?: Function,
    callbackError?: Function
}

export type { IFetch, IPromise }