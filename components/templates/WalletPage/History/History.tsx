import { } from '@type/CustomTheme'
import Container from '@element/Container'
import { FC, useEffect, useRef } from 'react'
import Card from '@element/Card'
import { Pokemon } from '@domain/Pokemon'
import { SATOSHI } from '@constant/bitcoinStandard'
import useApi from '@hook/useApi'
import coinAPI from '@api/coinAPI/coinAPI'

const getAssetsFormated = (pokemonAssets: Pokemon[], rate: number) => {
    const currentCostBasis = (asset: Pokemon) => asset.baseExperience * SATOSHI * rate
    let totalValuation = 0

    const assets = pokemonAssets.map(asset => {
        totalValuation += currentCostBasis(asset) - asset.costBasis

        return {
            id: asset._id,
            name: asset.name,
            registerDate: new Date(asset.registerDatetime),
            inactiveDate: asset.inactiveDatetime && new Date(asset.inactiveDatetime),
            valor: currentCostBasis(asset),
        }
    })

    return { totalValuation, assets }
}

interface IComponentProps {
    assets: Pokemon[],
}

const HistoryTemplate: FC<IComponentProps> = ({ assets }) => {
    const assetsFormated = useRef<{ totalValuation: number, assets: any[] }>()
    const [{ response }] = useApi(coinAPI.getRequestInfo())

    useEffect(() => {
        debugger
        const rate = response?.data?.rate
        if (rate) assetsFormated.current = getAssetsFormated(assets, rate)

    }, [response])


    return (
        <Container gap="md" direction='column' >
            {assetsFormated.current && <Card maxWidth={450}>
                <h2>Acompanhe abaixo as transações da sua carteira</h2>
                <h3>Total: USD ${assetsFormated.current.totalValuation}</h3>
                {assetsFormated.current.assets.map(({ id, name, registerDate, inactiveDate, valor, }) => (
                    <dl key={id?.toString()}>
                        <dt>Pokemon {name}:</dt>
                        <dd>
                            {!inactiveDate && <div>
                                Data da compra: {registerDate}
                            </div>}
                            {inactiveDate && <div>
                                Data da venda: {inactiveDate}
                            </div>}
                            <div>
                                Valor: USD ${valor}
                            </div>
                        </dd>
                    </dl>
                ))}
            </Card>}
        </Container>
    )
}

export default HistoryTemplate