import getPokemon from '@api/getPokemon'
import saveWallet, { getUserWallet, Pokemon, Wallet } from '@api/savePokemon'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    status: 'success' | 'error',
    message: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { name }: { name: string | number } = req.body

    try {
        const response = await saveWallet(new Wallet([new Pokemon('tais3', 'loucura', 52, new ObjectId())], new ObjectId()))
        // const response = await getUserWallet('0000000123b2cf97df4f65c3')
        // const response = await getPokemon(name)
        console.log('response: ', response)
        res.status(200).json({ status: 'success', message: 'Pokemon salvo com sucesso!' })
    } catch (error) {
        console.log('response: ', error)
        res.status(500).send({ status: 'error', message: 'Erro ao salvar, tente novamente' })
    }
}

