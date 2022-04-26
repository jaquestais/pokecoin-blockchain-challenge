import { PokemonWallet } from '@domain/Pokemon'
import { createContext, MutableRefObject } from 'react'

interface IContext {
    state: PokemonWallet,
    setState: Function,
    store: MutableRefObject<PokemonWallet>,
}

const defaultContextValue: IContext = {
    state: new PokemonWallet([]),
    setState: () => { },
    store: { current:  new PokemonWallet([])},
}

const WalletContext = createContext<IContext>(defaultContextValue)
WalletContext.displayName = 'WalletContext'

export default WalletContext