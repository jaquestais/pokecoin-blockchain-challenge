import { PokemonWallet } from "@domain/Pokemon";
import { FC, ReactNode, useRef, useState } from "react";
import WalletContext from "./Context";

interface IProviderProps {
    initialWallet?: PokemonWallet,
    children: ReactNode,
}

const WalletProvider: FC<IProviderProps> = ({ initialWallet = new PokemonWallet([]), children }) => {
    const [state, setState] = useState(initialWallet)
    const store = useRef(initialWallet)

    const contextValue = {
        state,
        setState: (wallet: PokemonWallet) => {
            store.current = wallet
            setState(wallet)
        },
        updateState: () => {
            setState(store.current)
        },
        store: store,
        setStore: (wallet: PokemonWallet) => {
            store.current = wallet
        },
    }

    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletProvider