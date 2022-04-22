interface IFetch {
    input:  RequestInfo | URL,
    callbackSuccess?: Function,
    callbackError?: Function
}

interface IPromise {
    action:  Function,
    callbackSuccess?: Function,
    callbackError?: Function
}

export type { IFetch, IPromise }