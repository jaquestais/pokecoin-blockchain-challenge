import { } from '@type/CustomTheme'
import Container from '@element/Container'
import { FC, useEffect, useState } from 'react'
import Card from '@element/Card'
import { Pokemon } from '@domain/Pokemon'
import { SATOSHI } from '@constant/bitcoinStandard'
import useApi from '@hook/useApi'
import coinAPI from '@api/coinAPI/coinAPI'
import SimpleDetailsCard from '@element/SimpleDetailsCard'

const getAssetsFormated = (pokemonAssets: Pokemon[], rate: number): { assets: any[] } => {
    const currentCostBasis = (asset: Pokemon) => asset.baseExperience * SATOSHI * rate
    const getAssetFormatted = (asset: Pokemon, acquisitionRecord: boolean) => ({
        id: `${asset._id}${acquisitionRecord}`,
        name: asset.name,
        image: asset.image,
        acquisitionRecord,
        date: acquisitionRecord ? asset.registerDatetime : asset.inactiveDatetime!,
        valor: currentCostBasis(asset),
    })

    const assets: any[] = []

    pokemonAssets.forEach(asset => {
        assets.push(getAssetFormatted(asset, true))
        if (!asset.active) assets.push(getAssetFormatted(asset, false))
    })

    return { assets: assets.sort((a, b) => b.date - a.date) }
}

interface IComponentProps {
    assets: Pokemon[],
}

const HistoryTemplate: FC<IComponentProps> = ({ assets }) => {
    const [assetsFormated, setAssetsFormated] = useState<{ assets: any[] }>()
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
            {assetsFormated && <Card maxWidth={1000}>
                <h2>Acompanhe abaixo as transações da sua carteira</h2>
                <Container gap='xs'>
                    {assetsFormated.assets.map(({ id, name, image, acquisitionRecord, date, valor, }) => (
                        <SimpleDetailsCard full src={image} key={id?.toString()}>
                            <dl key={id}>
                                <dt>Transação:</dt>
                                <dd>{acquisitionRecord ? 'Compra' : 'Venda'}</dd>
                                <dt>Data da transação:</dt>
                                <dd>{new Date(date).toLocaleString('pt-BR')}</dd>
                                <dt>Pokemon:</dt>
                                <dd>{name}</dd>
                                <dt>Valor:</dt>
                                <dd>USD ${valor}</dd>
                            </dl>
                        </SimpleDetailsCard>

                    ))}
                </Container>
            </Card>}
        </Container>
    )
}

export default HistoryTemplate