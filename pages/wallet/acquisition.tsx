import pokemonWalletAPI from '@api/pokemonAPI/pokemonWalletAPI'
import WalletContext from '@context/Wallet/Context'
import WalletProvider from '@context/Wallet/Provider'
import Default from '@layout/Default/Default'
import HomePage from '@template/HomePage/HomePage'
import { GetServerSideProps } from 'next/types'
import { FC, useContext } from 'react'

interface IComponentProps {
    wallet: string,
}

const Acquisition: FC<IComponentProps> = ({ wallet }) => {

    return (
        <Default>
            <Acquisition wallet={wallet} />
        </Default>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const WALLET_DEFAULT_ID = '62631b4f2206cbe541e7ab89' // seria dinamico se fosse implementado login

//     const response = await pokemonWalletAPI.getUserWallet(WALLET_DEFAULT_ID)

//     return {
//         props:
//         {
//             wallet: JSON.stringify(response),
//         }
//     }
// }

export default Acquisition