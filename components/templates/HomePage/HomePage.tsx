import { FC, useContext, useEffect, useRef } from 'react'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import useApi from '@hook/useApi'
import serverRequestAPI from '@api/serverRequestAPI'
import Card from '@element/Card'
import SimpleSearchForm from '@module/SimpleSearchForm/SimpleSearchForm'
import { Pokemon, PokemonWallet } from '@domain/Pokemon'
import SimpleActionCard from '@module/SimpleActionCard/SimpleActionCard'
import WalletContext from '@context/Wallet/Context'
import Actions from '@context/Wallet/Actions'
import Wallet from '@domain/Wallet'

const HomePage: FC = () => {
    const [{ loading, response, error }, setApi] = useApi()
    const { state: wallet, dispatch } = useContext(WalletContext)
    const awaitingChange = useRef<{ modifying: boolean, condition: boolean }>({ modifying: false, condition: !!(wallet._id && wallet.assets.length > 0) })

    const addAsset = (pokemon: Pokemon) => {
        dispatch({ type: Actions.ADD_ASSET, asset: pokemon })
        awaitingChange.current.modifying = true
    }

    useEffect(() => {
        const { current: { modifying, condition } } = awaitingChange

        if (modifying && condition) {
            setApi(serverRequestAPI.saveWallet(wallet))
            awaitingChange.current.modifying = false
        }

    }, [wallet])

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
                    onSubmit={() => addAsset(response.data)}
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

export default HomePage