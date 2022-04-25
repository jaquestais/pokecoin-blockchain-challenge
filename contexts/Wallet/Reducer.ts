import Wallet from "@domain/Wallet"
import Actions, { IActions } from "./Actions"

const reducer = (state: Wallet, { type, wallet, asset }: IActions ): Wallet => {
    switch (type) {
        case Actions.FILL_WALLET:
            if (!wallet)  return state

            return {
                ...wallet
            }
        case Actions.ADD_ASSET:
            if (!asset)  return state

            const newAssets = state.assets
            newAssets.push(asset)

            return {
                ...state,
                assets: newAssets,
            }
        case Actions.SALE_ASSET:
            if (!asset)  return state

            const modifiedAssets = state.assets
            const index = modifiedAssets.indexOf(asset)
            if (index >= 0) modifiedAssets[index].active = false

            return {
                ...state,
                assets: modifiedAssets,
            }
        default:
            throw new Error(`Unsupported type: ${type}`)
    }
}


export default reducer