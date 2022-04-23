import Wallet from "@domain/Wallet"

const WALLET_DEFAULT_ID = '62631b4f2206cbe541e7ab89' // seria dinamico se fosse implementado login

const requestInit: RequestInit = {}

const getPokemon = (nameOrId: string | number) => new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/pokemons/${nameOrId}`, requestInit)

const getUserWallet = () => `${process.env.NEXT_PUBLIC_HOST_URL}/api/wallets/${WALLET_DEFAULT_ID}`

const saveWallet = (wallet: Wallet) => {
    const requestInit: RequestInit = {
        method: 'post',
        body: JSON.stringify(wallet),
    }

    return new Request(`${process.env.NEXT_PUBLIC_HOST_URL}api/wallets/${wallet._id}`, requestInit)
}


const serverRequestAPI = { getPokemon, getUserWallet, saveWallet }

export default serverRequestAPI