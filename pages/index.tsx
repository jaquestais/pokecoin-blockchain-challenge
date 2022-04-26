import serverRequestAPI from '@api/serverRequestAPI'
import WalletContext from '@context/Wallet/Context'
import useApi from '@hook/useApi'
import Default from '@layout/Default/Default'
import HomePage from '@template/HomePage/HomePage'
import { FC, useContext, useEffect } from 'react'

const Home: FC = () => {
    const [{ response }, setApi] = useApi()
    const { state: wallet, setState } = useContext(WalletContext)

    useEffect(() => {
        if (!wallet?._id && response?.data) {

            setState(response.data)
        } else if (!wallet._id) {

            setApi(serverRequestAPI.getUserWallet())
        }

    }, [response])

    return (
        <Default>
            {wallet?._id && <HomePage />}
        </Default>
    )
}

export default Home