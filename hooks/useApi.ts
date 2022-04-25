import fetchApi from "@api/fetchAPI"
import Message from "@type/Message"
import { useEffect, useState } from "react"

const useApi = (inputInit?: RequestInfo | URL): [{ response: any, loading: boolean, error: any }, Function] => {
    const [input, setInput] = useState<RequestInfo | URL | undefined>(inputInit)
    const [loading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<{ data: any, message: Message } | null>(null)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        if (!input) return

        setLoading(true)
        setResponse(null)
        setError(null)

        input && fetchApi({
            input,
            callbackSuccess: (response: any) => {
                console.log('useAPI Data: ', response)
                setResponse(response)
                setLoading(false)
            }, callbackError: (response: any) => {
                console.log('useAPI Data: ', response)

                setError(response?.message ? response?.message : response)
                setLoading(false)
            }
        })
    }, [input])

    return [{ response, loading, error }, setInput]
}

export default useApi