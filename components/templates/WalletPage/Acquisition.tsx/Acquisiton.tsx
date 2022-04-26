import { FC, MutableRefObject } from 'react'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import useApi from '@hook/useApi'
import serverRequestAPI from '@api/serverRequestAPI'
import Card from '@element/Card'
import SimpleSearchForm from '@module/SimpleSearchForm/SimpleSearchForm'
import PokemonInfoActionCard from '../PokemonInfoActionCard'
import Wallet from '@domain/Wallet'

interface IComponentProps {
    store: MutableRefObject<Wallet>,
}

const AcquisitionTemplate: FC<IComponentProps> = ({ store }) => {
    const [{ loading, response, error }, setApi] = useApi()

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
                    message={error || response?.message}
                >
                    Encontre Pokemons
                </SimpleSearchForm>
            </Card>
            <PokemonInfoActionCard pokemon={response?.data} store={store} action='Adquirir' apiAction={serverRequestAPI.saveWalletAsset}>
                Adquira o Pokemon encontrado abaixo:
            </PokemonInfoActionCard>
        </Container >
    )
}

export default AcquisitionTemplate