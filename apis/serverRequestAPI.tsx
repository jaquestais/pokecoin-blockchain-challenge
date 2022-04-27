import { Pokemon } from "@domain/Pokemon"
import Wallet, { Asset } from "@domain/Wallet"

const requestInit: RequestInit = {}

const getPokemon = (nameOrId: string | number) => new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/pokemons/${nameOrId}`, requestInit)

const getUserWallet = () => new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/wallets/${process.env.NEXT_PUBLIC_WALLET_DEFAULT_ID}`)

const saveWallet = (wallet: Wallet) => {
    const requestInit: RequestInit = {
        method: 'post',
        body: JSON.stringify(wallet),
    }

    return new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/wallets/${wallet._id}`, requestInit)
}

const saveWalletAsset = (wallet: Wallet, newAsset: Asset) => {
    const requestInit: RequestInit = {
        method: 'put',
        body: JSON.stringify({ wallet, newAsset }),
    }

    return new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/wallets/${wallet._id}`, requestInit)
}

const saveWalletAssetInactive = (wallet: Wallet, asset: Pokemon) => {
    const requestInit: RequestInit = {
        method: 'put',
        body: JSON.stringify({ wallet, assetId: asset?._id?.toString() }),
    }

    return new Request(`${process.env.NEXT_PUBLIC_HOST_URL}/api/wallets/${wallet._id}`, requestInit)
}


const serverRequestAPI = { getPokemon, getUserWallet, saveWallet, saveWalletAsset, saveWalletAssetInactive }

export default serverRequestAPI