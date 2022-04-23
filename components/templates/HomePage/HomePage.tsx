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
import Wallet from '@domain/Wallet'
import Image from 'next/image'
import walletAPI from '@api/walletAPI/walletAPI'
import { Pokemon } from '@domain/Pokemon'

interface IComponentProps {
    wallet: Wallet,
}

const HomePage: FC<IComponentProps> = ({ wallet }) => {
    const [{ loading, response, error }, setApi] = useApi()

    return (
        <HomePageStyle>
            <Container gap="md">
                <Card>
                    <SimpleSearchForm
                        loading={loading}
                        field={{
                            name: 'pokemon',
                            label: 'Nome ou ID:',
                        }}
                        onSubmit={({ pokemon }: any) => setApi(serverRequestAPI.getPokemon(pokemon.value))}
                    >
                        Encontre seu Pokemon
                    </SimpleSearchForm>
                </Card>
                {response?.data as Pokemon && <Card solid maxWidth={340}>
                    <Form loading={loading} onSubmit={() => setApi(`${process.env.NEXT_PUBLIC_HOST_URL}api/wallets/${wallet._id}`)}>
                        <h2>Cadastre o Pokemon encontrado abaixo:</h2>
                        <Image src={response?.data.image} alt={`Imagem do pokemon ${response?.data.name}`} objectFit="cover" objectPosition="top" height={290} width={273} />
                        <h3>{response?.data.name}</h3>                        <dl>
                            <dt>Base experience:</dt>
                            <dd>{response?.data.baseExperience || 'desconhecido :('}</dd>
                        </dl>
                        <Button type="submit">Cadastrar</Button>
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