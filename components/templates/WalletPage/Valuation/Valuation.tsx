import { } from '@type/CustomTheme'
import Container from '@element/Container'
import { FC, useEffect, useRef } from 'react'
import Card from '@element/Card'
import { Pokemon } from '@domain/Pokemon'
import { SATOSHI } from '@constant/bitcoinStandard'
import useApi from '@hook/useApi'
import coinAPI from '@api/coinAPI/coinAPI'
import SimpleDetailsCard from '@element/SimpleDetailsCard'

const getAssetsFormated = (pokemonAssets: Pokemon[], rate: number) => {
    const currentCostBasis = (asset: Pokemon) => asset.baseExperience * SATOSHI * rate
    let totalValuation = 0

    const assets = pokemonAssets.filter(asset => asset.active).map(asset => {
        totalValuation += currentCostBasis(asset) - asset.costBasis

        return {
            id: asset._id,
            name: asset.name,
            image: asset.image,
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
        const rate = response?.data?.rate
        if (rate) assetsFormated.current = getAssetsFormated(assets, rate)

    }, [response])


    return (
        <Container gap="md" direction='column' >
            {assetsFormated.current && <Card maxWidth={1000}>
                <h2>Acompanhe abaixo a valorização dos seus Pokemons comparado ao USD de hoje</h2>
                <h3>Total: USD ${assetsFormated.current.totalValuation}</h3>
                <Container gap='xs'>
                    {assetsFormated.current.assets.map(({ id, name, image, costBasis, costBasisToday, valuation }) => (
                        <SimpleDetailsCard src={image} key={id?.toString()}>
                            <dl >
                                <dt>Pokemon:</dt>
                                <dd>{name}</dd>
                                <dt>Compra: </dt>
                                <dd>USD ${costBasis}</dd>
                                <dt> Hoje: </dt>
                                <dd>USD ${costBasisToday}</dd>
                                <dt> Valorização: </dt>
                                <dd>USD ${valuation}</dd>
                            </dl>
                        </SimpleDetailsCard>
                    ))}
                </Container>
            </Card>}
        </Container>
    )
}

export default ValuationTemplate