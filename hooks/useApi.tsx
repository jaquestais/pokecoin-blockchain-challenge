import fetchApi from "@api/fetchAPI"
import { useEffect, useState } from "react"

const useApi = (inputInit?: RequestInfo | URL): [{ data: any, loading: boolean, error: any }, Function] => {
    const [input, setInput] = useState<RequestInfo | URL | undefined>(inputInit)
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        if (!input) return

        console.log('entrou no useeffect useApi')

        setLoading(true)

        input && fetchApi({
            input,
            callbackSuccess: (data: any) => {
                debugger
                setData(data)
                setLoading(false)
            }, callbackError: (error: any) => {
                setError(error)
                setLoading(false)
            }
        })
    }, [input])

    return [{ data, loading, error }, setInput]
}

export default useApi