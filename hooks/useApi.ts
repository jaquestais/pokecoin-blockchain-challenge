import fetchApi from "@api/fetchAPI"
import Message from "@type/Message"
import { useEffect, useState } from "react"

const useApi = (inputInit?: RequestInfo): [{ response: any, loading: boolean, error: any }, Function] => {
    const [input, setInput] = useState<RequestInfo | undefined>(inputInit)
    const [loading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<{ data: any, message: Message } | null>(null)
    const [error, setError] = useState<any>(null)
    
    useEffect(() => {
        if (!input && !inputInit) return
        
        setLoading(true)
        setResponse(null)
        setError(null)
        
        input || inputInit && fetchApi({
            input: input || inputInit,
            callbackSuccess: (response: any) => {
                setResponse(response)                
                setLoading(false)
            }, callbackError: (response: any) => {
                setError(response?.message ? response?.message : response)
                setLoading(false)
            }
        })

    }, [input])

    return [{ response, loading, error }, setInput]
}

export default useApi