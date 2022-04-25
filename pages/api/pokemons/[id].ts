import coinAPI from '@api/coinAPI/coinAPI'
import fetchAPI from '@api/fetchAPI'
import pokemonAPI from '@api/pokemonAPI/pokemonAPI'
import { SATOSHI } from '@constant/bitcoinStandard'
import { Pokemon } from '@domain/Pokemon'
import IMessage from '@type/Message'
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

    const getMappedPokemon = (data: any, coinData: any): Pokemon => {

        return {
            name: data?.name,
            image: data?.sprites?.front_default,
            baseExperience: data?.base_experience,
            registerDatetime: new Date().getTime(),
            costBasis: coinData?.rate * data?.base_experience * SATOSHI,
            active: true,
        }
    }
    
    if (req.method === 'GET') {
        const { id } = req.query
        
        if (!id || Array.isArray(id)) {
            res.status(400)
            res.send({ message: { status: 'error', description: 'Pokemon nome ou Id inválido' }})
            res.end()
        }
        
        fetchAPI({
            input: [pokemonAPI.getRequestInfo(id as string), coinAPI.getRequestInfo()],
            callbackSuccess: async ([pokemonResponse, coinResponse]: any) => {
                res.status(200)
                res.json({ message: { status: 'success', description: 'Pokemon encontrado com sucesso!' }, data: getMappedPokemon(pokemonResponse, coinResponse) })
                res.end()
            },
            callbackError: (error: any) => {
                res.status(500)
                res.send({ message: { status: 'error', description: 'Erro ao procurar pokemon, tente novamente' }, error })  
                res.end()
            }
        })
    } else {
        res.end()
    }
}

