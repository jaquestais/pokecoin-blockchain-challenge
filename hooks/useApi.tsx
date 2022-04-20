import { useEffect, useState } from "react"

const useApi = (inputInit?: RequestInfo | URL): [{ loading: boolean, data: any }, Function] => {
    const [input, setInput] = useState<RequestInfo | URL | undefined>(inputInit)
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)

    const fetchApi = async (input: RequestInfo | URL) => {
        try {
            const response = await fetch(input)
            const data = await response.json()

            console.log('useApi: ', data)

            setData(data)
            setLoading(false)
        } catch (error) {
            console.log('useApi error: ', error)
        }
    }

    useEffect(() => {
        setLoading(true)
        console.log('entrou no useeffect useApi')
        input && fetchApi(input)
    }, [input])

    return [{ loading, data }, setInput]
}

export default useApi