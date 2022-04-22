import pokemonWalletAPI from '@api/pokemonAPI/pokemonWalletAPI'
import promiseHandler from '@api/promiseHandlerAPI'
import { PokemonWallet } from '@domain/Pokemon'
import type { NextApiRequest, NextApiResponse } from 'next'

const WALLET_DEFAULT_ID = '0000000123b2cf97df4f65c3'

type ResponseData = {
    status: 'success' | 'error',
    message: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {    
    if (req.method === 'GET') {
        promiseHandler({
            action: async () =>  await pokemonWalletAPI.getUserWallet(WALLET_DEFAULT_ID),
            callbackSuccess: (data: any) => {
                console.log('wallets-data: ', data)
                res.status(200).json({ status: 'success', message: 'Wallet encontrada com sucesso!' })
            },
            callbackError: (error: any) => {
                console.log('wallets-error: ', error)
                res.status(500).send({ status: 'error', message: 'Erro ao procurar wallet, tente novamente' })
            }        
        })
    } else if (req.method === 'POST') {
        const { wallet }: { wallet: PokemonWallet } = req.body

        promiseHandler({
            action: async () =>  await pokemonWalletAPI.saveWallet(wallet),
            callbackSuccess: (data: any) => {
                console.log('wallets-data: ', data)
                res.status(200).json({ status: 'success', message: 'Wallet salva com sucesso!' })
            },
            callbackError: (error: any) => {
                console.log('wallets-error: ', error)
                res.status(500).send({ status: 'error', message: 'Erro ao salvar wallet, tente novamente' })
            }        
        })
    }
}

