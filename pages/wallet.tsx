import serverRequestAPI from '@api/serverRequestAPI'
import WalletContext from '@context/Wallet/Context'
import { PokemonWallet } from '@domain/Pokemon'
import Loader from '@element/Loader'
import useApi from '@hook/useApi'
import Default from '@layout/Default/Default'
import AcquisitionTemplate from '@template/WalletPage/Acquisition.tsx/Acquisiton'
import HistoryTemplate from '@template/WalletPage/History/History'
import SaleTemplate from '@template/WalletPage/Sale/Sale'
import ValuationTemplate from '@template/WalletPage/Valuation/Valuation'
import { useRouter } from 'next/router'
import { FC, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'

const getTemplate = (path: string, store: MutableRefObject<PokemonWallet>, setStore: Function) => {
    switch (path) {
        case '/wallet/history':

            return <HistoryTemplate assets={store.current?.assets} />

        case '/wallet/sale':

            return <SaleTemplate store={store} />

        case '/wallet/valuation':

            return <ValuationTemplate assets={store.current?.assets} />

        default:
            return <AcquisitionTemplate store={store} set={setStore} />
    }
}

const Wallet: FC = () => {
    const [{ response }, setApi] = useApi()
    const { state, setState } = useContext(WalletContext)
    const router = useRouter()
    const store = useRef(state)
    const setStore = (value: PokemonWallet) => {
        store.current = value
    }
    const [template, setTemplate] = useState(getTemplate(router.asPath, store, setStore))


    useEffect(() => {
        if (!state?._id && response?.data) {
            setState(response.data)
            store.current = response.data
        } else if (!state._id) {
            setApi(serverRequestAPI.getUserWallet())
        }

    }, [response])

    useEffect(() => {
        router.push('/wallet', '/wallet/acquisition', { shallow: true })
    }, [])

    useEffect(() => {
        setTemplate(getTemplate(router.asPath, store, setStore))
    }, [router.asPath])

    return (
        <Default>
            <Loader loading={!state?._id}>
                {state?._id && template}
            </Loader>
        </Default>
    )
}

export default Wallet