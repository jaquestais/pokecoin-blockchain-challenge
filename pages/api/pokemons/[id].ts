import fetchAPI from '@api/fetchAPI'
import pokemonAPI from '@api/pokemonAPI/pokemonAPI'
import { Pokemon } from '@domain/Pokemon'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    status: 'success' | 'error',
    message: string,
    data?: Pokemon,
    error?: any,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {    

    const getMappedPokemon = (data: any): Pokemon => ({
            _id: data?._id,
            name: data?.name,
            image: data?.sprites?.front_default,
            baseExperience: data?.base_experience,
            registerDatetime: new Date().getTime(),
        }
    )
    
    if (req.method === 'GET') {
        const { id } = req.query
        
        if (!id || Array.isArray(id)) res.status(400).send({ status: 'error', message: 'Pokemon nome ou Id inválido' })
        
        fetchAPI({
            input: await pokemonAPI.getRequestInfo(id as string),
            callbackSuccess: (response: any) =>  res.status(200).json({ status: 'success', message: 'Pokemon encontrado com sucesso!', data: getMappedPokemon(response) }),
            callbackError: (error: any) => res.status(500).send({ status: 'error', message: 'Erro ao procurar pokemon, tente novamente', error })  
        })
    } 
}

