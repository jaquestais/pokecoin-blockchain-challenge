import Wallet from '@domain/Wallet'
import { createContext, Dispatch, } from 'react'
import { IActions } from './Actions'

interface IContext {
    state: Wallet,
    dispatch: Dispatch<IActions>,
}

const defaultContextValue: IContext = {
    state: new Wallet([]),
    dispatch: () => { },
}

const WalletContext = createContext<IContext>(defaultContextValue)
WalletContext.displayName = 'WalletContext'

export default WalletContext