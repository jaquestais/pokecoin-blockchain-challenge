import { FC, useContext } from 'react'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import useApi from '@hook/useApi'
import serverRequestAPI from '@api/serverRequestAPI'
import Card from '@element/Card'
import SimpleSearchForm from '@module/SimpleSearchForm/SimpleSearchForm'
import WalletContext from '@context/Wallet/Context'
import PokemonInfoActionCard from './PokemonInfoActionCard'

const AcquisitionTemplate: FC = () => {
    const [{ loading, response, error }, setApi] = useApi()
    const { state: wallet, addAsset } = useContext(WalletContext)

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
            <PokemonInfoActionCard wallet={wallet} pokemon={response?.data} callbackState={addAsset}></PokemonInfoActionCard>
        </Container>
    )
}

export default AcquisitionTemplate