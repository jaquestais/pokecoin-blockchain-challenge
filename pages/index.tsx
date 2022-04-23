import fetchAPI from '@api/fetchAPI'
import serverRequestAPI from '@api/serverRequestAPI'
import { PokemonWallet } from '@domain/Pokemon'
import Default from '@layout/Default/Default'
import HomePage from '@template/HomePage/HomePage'
import { GetServerSideProps } from 'next/types'
import { FC } from 'react'

interface IComponentProps {
    wallet: PokemonWallet,
}

const Home: FC<IComponentProps> = ({ wallet }) => {
    console.log('home', wallet)
    debugger

    return (
        <Default>
            <HomePage wallet={wallet} />
        </Default>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let walletData: PokemonWallet;

    fetchAPI({
        input: serverRequestAPI.getUserWallet(),
        callbackSuccess: async (response: any) => {
            console.log('response', JSON.stringify(response))
            walletData = await response.data
        },
        // callbackError: , redirecionamento para login e criação de carteira 
    })

    console.log('oi', walletData)

    return {
        props:
        {
            wallet: await walletData,
        }
    }
}

export default Home