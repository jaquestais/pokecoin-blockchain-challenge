import Wallet, { Asset } from "@domain/Wallet";
import useReducerWithCallback from "@hook/useReducerWithCallback";
import { FC, ReactNode } from "react";
import Actions from "./Actions";
import WalletContext from "./Context";
import walletReducer from "./Reducer";

const init = (initial: Wallet) => initial

interface IProviderProps {
    initialWallet: Wallet,
    children: ReactNode,
}

const WalletProvider: FC<IProviderProps> = ({ initialWallet, children }) => {
    const [state, dispatch] = useReducerWithCallback(walletReducer, initialWallet, init)

    const fillWallet = (wallet: Wallet, callback?: Function) => dispatch({ type: Actions.FILL_WALLET, wallet }, callback)
    const addAsset = (asset: Asset, callback?: Function) => dispatch({ type: Actions.ADD_ASSET, asset }, callback)
    const saleAsset = (asset: Asset, callback?: Function) => dispatch({ type: Actions.SALE_ASSET, asset }, callback)

    const contextValue = {
        state,
        fillWallet,
        addAsset,
        saleAsset,
    }

    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletProvider