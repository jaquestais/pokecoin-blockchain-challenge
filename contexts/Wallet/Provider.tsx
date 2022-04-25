import Wallet from "@domain/Wallet";
import { FC, ReactNode, useReducer } from "react";
import WalletContext from "./Context";
import reducer from "./Reducer";

const init = (initial: Wallet) => initial

interface IProviderProps {
    initialWallet: Wallet,
    children: ReactNode,
}

const WalletProvider: FC<IProviderProps> = ({ initialWallet, children }) => {
    const [state, dispatch] = useReducer(reducer, initialWallet, init)

    const contextValue = {
        state,
        dispatch,
    }

    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletProvider