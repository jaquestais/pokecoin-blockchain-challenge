import pokemonWalletAPI from '@api/pokemonAPI/pokemonWalletAPI'
import promiseHandlerAPI from '@api/promiseHandlerAPI'
import Wallet from '@domain/Wallet'
import IMessage from '@type/Message'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: IMessage,
    data?: Wallet,
    error?: any,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {    
    if (req.method === 'GET') {
        console.log('get ')
        const { id } = req.query
        
        if (!id || Array.isArray(id)) {
            res.status(400)
            res.send({ message: { status: 'error', description: 'Wallet Id inválido' }})
            res.end()
        }
        console.log('get2 ')
        promiseHandlerAPI({
            action: async () =>  await pokemonWalletAPI.getUserWallet(id as string),
            callbackSuccess: (data: any) => {
                res.status(200)
                res.json({ message: { status: 'success', description: 'Wallet encontrada com sucesso!' }, data })
                res.end()
            },
            callbackError: (error: any) => { 
                res.status(500)
                res.send({ message: { status: 'error', description: 'Erro ao procurar wallet, tente novamente' }, error })  
                res.end()
            }
        })
    } else if (req.method === 'POST') {
        const wallet = JSON.parse(req.body)
        wallet._id = new ObjectId(wallet._id)

        promiseHandlerAPI({
            action: async () =>  await pokemonWalletAPI.saveWallet(wallet),
            callbackSuccess: (data: any) => {
                console.log('wallets-data: ', data)
                res.status(200)
                res.json({ message: { status: 'success', description: 'Wallet salva com sucesso!' }, data: wallet })
                res.end
            },
            callbackError: (error: any) => {
                console.log('wallets-error: ', error)
                res.status(500)
                res.send({ message: { status: 'error', description: 'Erro ao salvar wallet, tente novamente' }})
                res.end
            }        
        })
    } else if (req.method === 'PUT') {
        const { wallet, newAsset, asset } = JSON.parse(req.body)
        wallet._id = new ObjectId(wallet._id)
        
        if (newAsset) {
            wallet.assets.push(newAsset)
        } else if (asset) {
            const modifiedAssets = wallet.assets
            const index = modifiedAssets.indexOf(asset)
            if (index >= 0) {
                modifiedAssets[index].active = false
                modifiedAssets[index].inactiveDatetime = new Date().getTime()
            }

            wallet.asset = modifiedAssets
        }


        promiseHandlerAPI({
            action: async () =>  await pokemonWalletAPI.saveWallet(wallet),
            callbackSuccess: (data: any) => {
                console.log('asset-data: ', data)
                res.status(200)
                res.json({ message: { status: 'success', description: `Asset ${newAsset ? 'salvo' : 'vendido'} com sucesso!` }, data: wallet })
                res.end
            },
            callbackError: (error: any) => {
                console.log('asset-error: ', error)
                res.status(500)
                res.send({ message: { status: 'error', description: `Erro ao ${newAsset ? 'salvar' : 'vender'} asset, tente novamente` }})
                res.end
            }        
        })
    } else {
        res.end()
    }
}

