import { API_URL_COINAPI } from '@constant/apisUrl'
import { API_KEY_COINAPI } from '@constant/apisKey'

const getRequestInfo = () => {
    const assetIdBase = 'BTC'
    const assetIdQuote = 'USD'

    return `${API_URL_COINAPI}/v1/exchangerate/${assetIdBase}/${assetIdQuote}?apikey=${API_KEY_COINAPI}`
}

const coinAPI = { getRequestInfo }

export default coinAPI