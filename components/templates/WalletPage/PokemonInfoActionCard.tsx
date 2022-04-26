import { FC, MutableRefObject, ReactNode, useEffect } from 'react'
import { } from '@type/CustomTheme'
import useApi from '@hook/useApi'
import Wallet from '@domain/Wallet'
import { Pokemon } from '@domain/Pokemon'
import SimpleActionCard from '@module/SimpleActionCard/SimpleActionCard'
import Card from '@element/Card'

interface IComponentProps {
    pokemon?: Pokemon,
    store: MutableRefObject<Wallet>,
    set: Function,
    action: string,
    apiAction: Function,
    children: ReactNode,
}

const PokemonInfoActionCard: FC<IComponentProps> = ({ pokemon, store, set, action, apiAction, children }) => {
    const [{ loading, response, error }, setApi] = useApi()

    const handleSubmit = () => {
        setApi(apiAction(store.current, pokemon!))
    }

    useEffect(() => {
        if (response?.data?.assets.length > 0) {
            set(response.data)
        }

    }, [response])

    useEffect(() => {
        if (response?.message) response.message = undefined

    }, [pokemon])

    return (
        <div>
            {pokemon?.image && <Card solid maxWidth={340}>
                <SimpleActionCard
                    loading={loading}
                    onSubmit={() => handleSubmit()}
                    title={children}
                    image={pokemon?.image}
                    alt={`Imagem do pokemon? ${pokemon?.name}`}
                    action={action}
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
            </Card>}
        </div>
    )
}

export default PokemonInfoActionCard