import pokemonWalletAPI from '@api/pokemonAPI/pokemonWalletAPI'
import promiseHandlerAPI from '@api/promiseHandlerAPI'
import { PokemonWallet } from '@domain/Pokemon'
import Wallet from '@domain/Wallet'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    status: 'success' | 'error',
    message: string,
    data?: Wallet,
    error?: any,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {    
    
    if (req.method === 'GET') {
        const { id } = req.query
        
        if (!id || Array.isArray(id)) res.status(400).send({ status: 'error', message: 'Wallet Id inválido' })
        
        promiseHandlerAPI({
            action: async () =>  await pokemonWalletAPI.getUserWallet(id as string),
            callbackSuccess: (data: any) => res.status(200).json({ status: 'success', message: 'Wallet encontrada com sucesso!', data }),
            callbackError: (error: any) => res.status(500).send({ status: 'error', message: 'Erro ao procurar wallet, tente novamente', error })  
        })
    } else if (req.method === 'POST') {
        const { wallet }: { wallet: PokemonWallet } = req.body

        promiseHandlerAPI({
            action: async () =>  await pokemonWalletAPI.saveWallet(wallet),
            callbackSuccess: (data: any) => {
                console.log('wallets-data: ', data)
                return res.status(200).json({ status: 'success', message: 'Wallet salva com sucesso!' })
            },
            callbackError: (error: any) => {
                console.log('wallets-error: ', error)
                return res.status(500).send({ status: 'error', message: 'Erro ao salvar wallet, tente novamente' })
            }        
        })
    }
}

