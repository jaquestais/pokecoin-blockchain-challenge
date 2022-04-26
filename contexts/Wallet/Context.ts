import Wallet from '@domain/Wallet'
import { createContext } from 'react'

interface IContext {
    state: Wallet,
    fillWallet: Function,
    addAsset: Function,
    saleAsset: Function,
}

const defaultContextValue: IContext = {
    state: new Wallet([]),
    fillWallet: () => { },
    addAsset: () => { },
    saleAsset: () => { },
}

const WalletContext = createContext<IContext>(defaultContextValue)
WalletContext.displayName = 'WalletContext'

export default WalletContext