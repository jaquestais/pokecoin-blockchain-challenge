import serverRequestAPI from '@api/serverRequestAPI'
import WalletContext from '@context/Wallet/Context'
import Loader from '@element/Loader'
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
    const { state, setState, setStore, store } = useContext(WalletContext)
    const router = useRouter()

    useEffect(() => {
        if (!state?._id && response?.data) {
            setState(response.data)
        } else if (!state._id) {
            setApi(serverRequestAPI.getUserWallet())
        }

    }, [response])

    useEffect(() => {
        router.push('/wallet', '/wallet/acquisition', { shallow: true })
    }, [])

    const RenderTemplate = () => {
        switch (router.asPath) {
            case '/wallet/history':
                return <HistoryTemplate assets={store.current?.assets} />

            case '/wallet/sale':
                return <SaleTemplate store={store} set={setStore} />

            case '/wallet/valuation':
                return <ValuationTemplate assets={store.current?.assets} />

            default:
                return <AcquisitionTemplate store={store} set={setStore} />
        }
    }

    return (
        <Default>
            <Loader loading={!state?._id}>
                {state?._id && <RenderTemplate />}
            </Loader>
        </Default>
    )
}

export default Wallet