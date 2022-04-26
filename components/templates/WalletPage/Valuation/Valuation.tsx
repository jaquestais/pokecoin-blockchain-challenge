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
            costBasis: asset.costBasis,
            costBasisToday: currentCostBasis(asset),
            valuation: currentCostBasis(asset) - asset.costBasis,
        }
    })

    return { totalValuation, assets }
}

interface IComponentProps {
    assets: Pokemon[],
}

const ValuationTemplate: FC<IComponentProps> = ({ assets }) => {
    const assetsFormated = useRef<{ totalValuation: number, assets: any[] }>()
    const [{ response }] = useApi(coinAPI.getRequestInfo())

    useEffect(() => {
        const { rate } = response?.data
        if (rate) assetsFormated.current = getAssetsFormated(assets, rate)

    }, [response])


    return (
        <Container gap="md" direction='column' >
            {assetsFormated.current && <Card maxWidth={450}>
                <h2>Acompanhe abaixo a valorização dos seus Pokemons comparado USD de hoje</h2>
                <h3>Total: USD ${assetsFormated.current.totalValuation}</h3>
                {assetsFormated.current.assets.map(({ id, name, costBasis, costBasisToday, valuation }) => (
                    <dl key={id?.toString()}>
                        <dt>Pokemon {name}:</dt>
                        <dd>
                            <div>
                                Compra: USD ${costBasis}
                            </div>
                            <div>
                                Hoje: USD ${costBasisToday}
                            </div>
                            <div>
                                Valorização: USD ${valuation}
                            </div>
                        </dd>
                    </dl>
                ))}
            </Card>}
        </Container>
    )
}

export default ValuationTemplate