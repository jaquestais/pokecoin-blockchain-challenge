import { FC, useContext } from 'react'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import useApi from '@hook/useApi'
import serverRequestAPI from '@api/serverRequestAPI'
import Card from '@element/Card'
import SimpleSearchForm from '@module/SimpleSearchForm/SimpleSearchForm'
import { Pokemon, PokemonWallet } from '@domain/Pokemon'
import SimpleActionCard from '@module/SimpleActionCard/SimpleActionCard'
import WalletContext from '@context/Wallet/Context'

interface IComponentProps {
    wallet: PokemonWallet,
}

const Acquisition: FC<IComponentProps> = ({ wallet }) => {
    const { state } = useContext(WalletContext)

    const [{ loading, response, error }, setApi] = useApi()
    console.log('state: ', state)
    console.log('wallet: ', wallet)

    const saveWallet = () => {
        wallet.assets.push(response?.data)
        return serverRequestAPI.saveWallet(wallet)
    }

    return (
        <Container gap="md" direction='column' >
            <Card maxWidth={450}>
                <SimpleSearchForm
                    loading={loading}
                    field={{
                        name: 'pokemon',
                        label: 'Nome ou ID',
                    }}
                    onSubmit={({ pokemon }: any) => setApi(serverRequestAPI.getPokemon(pokemon.value))}
                >
                    Encontre Pokemons
                </SimpleSearchForm>
            </Card>
            {response?.data as Pokemon && <Card solid maxWidth={340}>
                <SimpleActionCard
                    loading={loading}
                    onSubmit={() => setApi(saveWallet)}
                    title='Cadastre o Pokemon encontrado abaixo:'
                    image={response?.data.image}
                    alt={`Imagem do pokemon ${response?.data.name}`}
                    action='Adquirir'
                    message={error}
                >
                    <h3>{response?.data.name}</h3>
                    <dl>
                        <dt>Base experience:</dt>
                        <dd>{response?.data.baseExperience || 'desconhecido :('}</dd>
                    </dl>
                </SimpleActionCard>
            </Card>}
        </Container>
    )
}

export default Acquisition