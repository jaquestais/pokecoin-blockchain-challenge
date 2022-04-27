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

    const assets = pokemonAssets.map(asset => {

        return {
            id: asset._id,
            name: asset.name,
            image: asset.image,
            registerDate: new Date(asset.registerDatetime).toLocaleDateString('pt-BR'),
            inactiveDate: asset.inactiveDatetime && new Date(asset.inactiveDatetime).toLocaleDateString('pt-BR'),
            valor: currentCostBasis(asset),
        }
    })

    return { assets }
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
            {assetsFormated && <Card maxWidth={800}>
                <h2>Acompanhe abaixo as transações da sua carteira</h2>
                <Container gap='xs'>
                    {assetsFormated.assets.map(({ id, name, image, registerDate, inactiveDate, valor, }) => (
                        <SimpleDetailsCard src={image} key={id?.toString()}>
                            <dl key={id}>
                                <dt>Pokemon:</dt>
                                <dd>{name}</dd>
                                <dt>{`Data da ${inactiveDate ? 'venda' : 'compra'}`}</dt>
                                <dd>{inactiveDate ? inactiveDate : registerDate}</dd>
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