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
    const { state, setState, store } = useContext(WalletContext)
    const router = useRouter()

    useEffect(() => {
        if (!state?._id && response?.data) {
            setState(response.data)
        } else if (!state._id) {
            setApi(serverRequestAPI.getUserWallet())
        }

    }, [response])

    useEffect(() => {
        if (state?._id && store.current) {
            setState(store.current)
        }

    }, [router.asPath])

    useEffect(() => {
        router.push('/wallet', '/wallet/acquisition', { shallow: true })
    }, [])

    const RenderTemplate = () => {
        switch (router.asPath) {
            case '/wallet/history':

                return <HistoryTemplate assets={state.assets} />

            case '/wallet/sale':

                return <SaleTemplate store={store} />

            case '/wallet/valuation':

                return <ValuationTemplate assets={state.assets} />

            default:
                return <AcquisitionTemplate store={store} />
        }
    }

    return (
        <Default>
            {state?._id && <RenderTemplate />}
        </Default>
    )
}

export default Wallet