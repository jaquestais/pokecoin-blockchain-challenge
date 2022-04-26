import { PokemonWallet } from "@domain/Pokemon";
import { FC, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import WalletContext from "./Context";

interface IProviderProps {
    initialWallet?: PokemonWallet,
    children: ReactNode,
}

const WalletProvider: FC<IProviderProps> = ({ initialWallet = new PokemonWallet([]), children }) => {
    const [state, setState] = useState(initialWallet)
    const store = useRef(initialWallet)


    useEffect(() => {
        store.current = state
    }, [state])

    const contextValue = {
        state,
        setState: (params: SetStateAction<PokemonWallet>) => {
            setState(params)
        },
        store: store,
    }

    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletProvider