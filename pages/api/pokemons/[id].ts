import pokemon from '@api/pokemonAPI/pokemonAPI'
import promiseHandler from '@api/promiseHandlerAPI'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    status: 'success' | 'error',
    message: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { id } = req.query

    if (req.method === 'GET') {
        promiseHandler({
            action: async () =>  await pokemon.get(id),
            callbackSuccess: (data: any) => {
                console.log('pkm-data: ', data)
                res.status(200).json({ status: 'success', message: 'Pokemon encontrado com sucesso!' })
            },
            callbackError: (error: any) => {
                console.log('pkm-error: ', error)
                res.status(500).send({ status: 'error', message: 'Pokemon não encontrado, tente novamente' })
            }        
        })
    } 
}

