interface IFetch {
    input: Array<RequestInfo> | RequestInfo,
    callbackSuccess?: Function,
    callbackError?: Function
}

interface IPromise {
    action:  Function,
    callbackSuccess?: Function,
    callbackError?: Function
}

export type { IFetch, IPromise }