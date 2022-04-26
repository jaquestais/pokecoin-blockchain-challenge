import { FC, MutableRefObject } from 'react'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import useApi from '@hook/useApi'
import serverRequestAPI from '@api/serverRequestAPI'
import Card from '@element/Card'
import SimpleSearchForm from '@module/SimpleSearchForm/SimpleSearchForm'
import Wallet from '@domain/Wallet'
import PokemonInfoActionCard from '../PokemonInfoActionCard'

interface IComponentProps {
    store: MutableRefObject<Wallet>,
}

const SaleTemplate: FC<IComponentProps> = ({ store }) => {
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
                    Encontre seus Pokemons para vender
                </SimpleSearchForm>
            </Card>
            <PokemonInfoActionCard pokemon={response?.data} store={store} action='Vender' apiAction={serverRequestAPI.saveWalletAssetInactive}>
                Vender Pokemon encontrado abaixo:
            </PokemonInfoActionCard>
        </Container >
    )
}

export default SaleTemplate