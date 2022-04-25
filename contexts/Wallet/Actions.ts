import Wallet, { Asset } from "@domain/Wallet"

const enum Actions {
    FILL_WALLET = 'FILL_WALLET',
    ADD_ASSET = 'ADD_ASSET',
    SALE_ASSET = 'SALE_ASSET',
}

interface IActions {
    type: string,
    asset?: Asset,
    wallet?: Wallet,
}

export default Actions
export type { IActions }