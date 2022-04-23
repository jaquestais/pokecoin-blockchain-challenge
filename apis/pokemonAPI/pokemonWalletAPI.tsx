import { PokemonWallet } from "@domain/Pokemon"
import walletAPI from "@api/walletAPI/walletAPI"

const COLLECTION_NAME = 'pokemonWallets'

const saveWallet = async (wallet: PokemonWallet) => walletAPI.saveWallet(COLLECTION_NAME, wallet)

const getUserWallet = async (id: string): Promise<PokemonWallet | null> => walletAPI.getUserWallet(COLLECTION_NAME, id) as Promise<PokemonWallet | null>

const pokemonWalletAPI = { getUserWallet, saveWallet }

export default pokemonWalletAPI