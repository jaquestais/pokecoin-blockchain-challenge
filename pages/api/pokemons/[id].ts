import coinAPI from '@api/coinAPI/coinAPI'
import fetchAPI from '@api/fetchAPI'
import pokemonAPI from '@api/pokemonAPI/pokemonAPI'
import { SATOSHI } from '@constant/bitcoinStandard'
import { Pokemon } from '@domain/Pokemon'
import IMessage from '@type/Message'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: IMessage,
    data?: Pokemon,
    error?: any,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {    

    const getMappedPokemon = (data: any, coinData: any): Pokemon => ({
            _id: new ObjectId(),
            name: data?.name,
            image: data?.sprites?.front_default,
            baseExperience: data?.base_experience,
            registerDatetime: new Date().getTime(),
            inactiveDatetime: undefined,
            costBasis: coinData?.rate * data?.base_experience * SATOSHI,
            active: true,
    })
    
    if (req.method === 'GET') {
        const { id } = req.query
        
        if (!id || Array.isArray(id)) {
            res.status(400)
            res.send({ message: { status: 'error', description: 'Nome ou Id de Pokemon inválido' }})
            res.end()
        }
        
        fetchAPI({
            input: [pokemonAPI.getRequestInfo(id as string), coinAPI.getRequestInfo()],
            callbackSuccess: async ([pokemonResponse, coinResponse]: any) => {
                res.status(200)
                res.json({ message: { status: 'success', description: 'Pokemon encontrado com sucesso!' }, data: getMappedPokemon(pokemonResponse, coinResponse) })
                res.end()
            },
            callbackError: async (response: any) => {
                res.status(404)

                if (response[1].error) {
                    res.send({ message: { status: 'error', description: 'Erro ao buscar cotação de criptomoeda, tente novamente amanhã ou avise a Dev' }, error: response })  
                } else {
                    res.send({ message: { status: 'error', description: 'Pokemon não encontrado, tente outro nome ou Id' }, error: response })  
                }

                res.end()
            }
        })
    } else {
        res.status(404)
        res.end()
    }
}

