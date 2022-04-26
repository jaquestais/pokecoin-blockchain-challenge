import serverRequestAPI from '@api/serverRequestAPI'
import WalletContext from '@context/Wallet/Context'
import useApi from '@hook/useApi'
import Default from '@layout/Default/Default'
import AcquisitionTemplate from '@template/WalletPage/Acquisition.tsx/Acquisiton'
import HistoryTemplate from '@template/WalletPage/History/History'
import SaleTemplate from '@template/WalletPage/Sale/Sale'
import ValuationTemplate from '@template/WalletPage/Valuation/Valuation'
import { useRouter } from 'next/router'
import { FC, useContext, useEffect } from 'react'

const Wallet: FC = () => {
    const [{ response }, setApi] = useApi()
    const { state: wallet, fillWallet } = useContext(WalletContext)
    const router = useRouter()

    useEffect(() => {
        if (!wallet?._id && response?.data) {

            fillWallet(response.data)
        } else if (!wallet._id) {

            setApi(serverRequestAPI.getUserWallet())
        }

    }, [response])

    useEffect(() => {
        router.push('/wallet', '/wallet/acquisition', { shallow: true })
    }, [])

    const RenderTemplate = () => {
        switch (router.asPath) {
            case '/wallet/acquisition':

                return <AcquisitionTemplate />

            case '/wallet/history':

                return <HistoryTemplate wallet={wallet} />

            case '/wallet/sale':

                return <SaleTemplate />

            case '/wallet/valuation':

                return <ValuationTemplate wallet={wallet} />

            default:
                return <AcquisitionTemplate />
        }
    }

    return (
        <Default>
            {wallet._id && <RenderTemplate />}
        </Default>
    )
}

export default Wallet