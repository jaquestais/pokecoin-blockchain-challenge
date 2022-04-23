import { FC } from 'react'
import styled from 'styled-components'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import Form from '@module/Form/Form'
import Button from '@element/Button'
import useApi from '@hook/useApi'
import serverRequestAPI from '@api/serverRequestAPI'
import Card from '@element/Card'
import SimpleSearchForm from '@module/SimpleSearchForm/SimpleSearchForm'
import Image from 'next/image'
import { Pokemon, PokemonWallet } from '@domain/Pokemon'

interface IComponentProps {
    wallet: PokemonWallet,
}

const HomePage: FC<IComponentProps> = ({ wallet }) => {
    const [{ loading, response }, setApi] = useApi()
    console.log('wallet: ', wallet)

    return (
        <HomePageStyle>
            <Container gap="md" direction='column' align='center'>
                <Card maxWidth={450}>
                    <SimpleSearchForm
                        loading={loading}
                        field={{
                            name: 'pokemon',
                            label: 'Nome ou ID',
                        }}
                        onSubmit={({ pokemon }: any) => setApi(serverRequestAPI.getPokemon(pokemon.value))}
                    >
                        Encontre seu Pokemon
                    </SimpleSearchForm>
                </Card>
                {response?.data as Pokemon && <Card solid maxWidth={340}>
                    <Form loading={loading} onSubmit={() => setApi(serverRequestAPI.saveWallet({ ...wallet, assets: [...wallet.assets, response?.data] }))}>
                        <h2>Cadastre o Pokemon encontrado abaixo:</h2>
                        <Image src={response?.data.image} alt={`Imagem do pokemon ${response?.data.name}`} objectFit="cover" objectPosition="center" height={120} width={120} />
                        <h3>{response?.data.name}</h3>
                        <dl>
                            <dt>Base experience:</dt>
                            <dd>{response?.data.baseExperience || 'desconhecido :('}</dd>
                        </dl>
                        <Button type="submit" light>Cadastrar</Button>
                    </Form>
                </Card>}
            </Container>
        </HomePageStyle >
    )
}

const HomePageStyle = styled.div`
    h2 {
        text-align: center;
    }

    dl {
        margin-top: 15px;
    }

    dd {
        text-align: right;
        font-family: ${props => props.theme.typography.fonts.secondary};
        margin-top: 5px;
        margin-bottom: 15px;
        margin-left: 30px;
    }
`

export default HomePage