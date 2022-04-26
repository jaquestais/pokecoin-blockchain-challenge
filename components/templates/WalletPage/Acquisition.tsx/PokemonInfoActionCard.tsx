import { FC } from 'react'
import { } from '@type/CustomTheme'
import useApi from '@hook/useApi'
import serverRequestAPI from '@api/serverRequestAPI'
import Wallet from '@domain/Wallet'
import { Pokemon } from '@domain/Pokemon'
import SimpleActionCard from '@module/SimpleActionCard/SimpleActionCard'
import Card from '@element/Card'

interface IComponentProps {
    wallet: Wallet,
    pokemon?: Pokemon,
    callbackState: Function,
}

const PokemonInfoActionCard: FC<IComponentProps> = ({ wallet, pokemon, callbackState }) => {
    const [{ loading, response, error }, setApi] = useApi()

    const handleSubmit = () => {
        setApi(serverRequestAPI.saveWalletAsset(wallet, pokemon!))
        callbackState(pokemon)
    }

    return (
        <Card solid maxWidth={340}>
            <SimpleActionCard
                loading={loading}
                onSubmit={() => handleSubmit()}
                title='Adquira o Pokemon encontrado abaixo:'
                image={pokemon?.image}
                alt={`Imagem do pokemon? ${pokemon?.name}`}
                action='Adquirir'
                message={error || response?.message}
            >
                <h3>{pokemon?.name}</h3>
                <dl>
                    <dt>Experiência base:</dt>
                    <dd>{pokemon?.baseExperience || 'desconhecido :('}</dd>
                    <dt>Preço médio:</dt>
                    <dd>{pokemon?.costBasis && `USD $${pokemon?.costBasis}` || 'desconhecido :('}</dd>
                </dl>
            </SimpleActionCard>
        </Card>
    )
}

export default PokemonInfoActionCard