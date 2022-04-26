import { FC, MutableRefObject, useState } from 'react'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import serverRequestAPI from '@api/serverRequestAPI'
import Card from '@element/Card'
import SimpleSearchForm from '@module/SimpleSearchForm/SimpleSearchForm'
import Wallet from '@domain/Wallet'
import PokemonInfoActionCard from '../PokemonInfoActionCard'
import IMessage from '@type/Message'
import { Pokemon } from '@domain/Pokemon'

interface IComponentProps {
    store: MutableRefObject<Wallet>,
    set: Function,
}

const SaleTemplate: FC<IComponentProps> = ({ store, set }) => {
    const [pokemon, setPokemon] = useState<Pokemon>()
    const [message, setMessage] = useState<IMessage>()

    const handleSubmit = ({ pokemon }: any) => {
        const asset = store.current.assets.find(asset => asset.active && (asset._id === pokemon.value || pokemon.value === asset.name))
        if (asset) {
            setPokemon(asset as Pokemon)
            setMessage({ status: 'success', description: 'Pokemon encontrado!' })
        } else {
            setMessage({ status: 'error', description: 'Pokemon não encontrado, tente novamente.' })
        }
    }

    return (
        <Container gap="md" direction='column' >
            <Card maxWidth={450}>
                <SimpleSearchForm
                    field={{
                        name: 'pokemon',
                        label: 'Nome ou ID',
                    }}
                    onSubmit={(target: any) => handleSubmit(target)}
                    message={message}
                >
                    Encontre seus Pokemons para vender
                </SimpleSearchForm>
            </Card>
            <PokemonInfoActionCard pokemon={pokemon} store={store} set={set} action='Vender' apiAction={serverRequestAPI.saveWalletAssetInactive}>
                Vender Pokemon encontrado abaixo:
            </PokemonInfoActionCard>
        </Container >
    )
}

export default SaleTemplate