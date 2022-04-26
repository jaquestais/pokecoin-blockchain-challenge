import { } from '@type/CustomTheme'
import Container from '@element/Container'
import { FC, useEffect, useState } from 'react'
import Card from '@element/Card'
import { Pokemon } from '@domain/Pokemon'
import { SATOSHI } from '@constant/bitcoinStandard'
import useApi from '@hook/useApi'
import coinAPI from '@api/coinAPI/coinAPI'

const getAssetsFormated = (pokemonAssets: Pokemon[], rate: number): { totalValuation: number, assets: any[] } => {
    const currentCostBasis = (asset: Pokemon) => asset.baseExperience * SATOSHI * rate
    let totalValuation = 0

    const assets = pokemonAssets.map(asset => {
        totalValuation += currentCostBasis(asset) - asset.costBasis

        return {
            id: asset._id,
            name: asset.name,
            registerDate: new Date(asset.registerDatetime).toLocaleDateString('pt-BR'),
            inactiveDate: asset.inactiveDatetime && new Date(asset.inactiveDatetime).toLocaleDateString('pt-BR'),
            valor: currentCostBasis(asset),
        }
    })

    return { totalValuation, assets }
}

interface IComponentProps {
    assets: Pokemon[],
}

const HistoryTemplate: FC<IComponentProps> = ({ assets }) => {
    const [assetsFormated, setAssetsFormated] = useState<{ totalValuation: number, assets: any[] }>()
    const [{ response }, setApi] = useApi()

    useEffect(() => {
        if (!response) {
            setApi(coinAPI.getRequestInfo())
        }

        const rate = response?.data?.rate
        if (rate) setAssetsFormated(getAssetsFormated(assets, rate))

    }, [response])


    return (
        <Container gap="md" direction='column' >
            {assetsFormated && <Card maxWidth={450}>
                <h2>Acompanhe abaixo as transações da sua carteira</h2>
                <h3>Total: USD ${assetsFormated.totalValuation}</h3>
                {assetsFormated.assets.map(({ id, name, registerDate, inactiveDate, valor, }) => (
                    <dl key={id}>
                        <dt>Pokemon {name}:</dt>
                        <dd>
                            <div>
                                {`Data da ${inactiveDate ? 'venda' : 'compra'}: ${inactiveDate ? inactiveDate : registerDate}`}
                            </div>
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