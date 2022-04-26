import { PokemonWallet } from '@domain/Pokemon'
import { createContext, MutableRefObject } from 'react'

interface IContext {
    state: PokemonWallet,
    setState: Function,
    updateState: Function,
    store: MutableRefObject<PokemonWallet>,
    setStore: Function,
}

const defaultContextValue: IContext = {
    state: new PokemonWallet([]),
    setState: () => { },
    updateState: () => { },
    store: { current:  new PokemonWallet([])},
    setStore: () => { }
}

const WalletContext = createContext<IContext>(defaultContextValue)
WalletContext.displayName = 'WalletContext'

export default WalletContext