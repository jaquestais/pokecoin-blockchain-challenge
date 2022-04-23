import fetchAPI from '@api/fetchAPI'
import serverRequestAPI from '@api/serverRequestAPI'
import Wallet from '@domain/Wallet'
import Default from '@layout/Default/Default'
import HomePage from '@template/HomePage/HomePage'
import { GetServerSideProps } from 'next/types'
import { FC } from 'react'

interface IComponentProps {
    wallet: Wallet,
}

const Home: FC<IComponentProps> = ({ wallet }) => {
    return (
        <Default>
            <HomePage wallet={wallet} />
        </Default>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let wallet = null

    fetchAPI({
        input: serverRequestAPI.getUserWallet(),
        callbackSuccess: async (response: any) => {
            wallet = response.data
        },
        // callbackError: , TODO: redirecionamento para login e criação de carteira 
    })

    return {
        props:
        {
            wallet
        }
    }
}

export default Home