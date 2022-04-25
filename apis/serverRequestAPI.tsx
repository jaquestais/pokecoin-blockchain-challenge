import Wallet from "@domain/Wallet"

const requestInit: RequestInit = {}

const getPokemon = (nameOrId: string | number) => new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/pokemons/${nameOrId}`, requestInit)

const getUserWallet = () => `${process.env.NEXT_PUBLIC_HOST_URL}/api/wallets/${process.env.NEXT_PUBLIC_WALLET_DEFAULT_ID}`

const saveWallet = (wallet: Wallet) => {
    const requestInit: RequestInit = {
        method: 'post',
        body: JSON.stringify(wallet),
    }

    return new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/wallets/${wallet._id}`, requestInit)
}


const serverRequestAPI = { getPokemon, getUserWallet, saveWallet }

export default serverRequestAPI