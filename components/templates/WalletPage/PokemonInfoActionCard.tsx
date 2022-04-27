import { FC, MutableRefObject, ReactNode, useEffect, useState } from 'react'
import { } from '@type/CustomTheme'
import useApi from '@hook/useApi'
import Wallet from '@domain/Wallet'
import { Pokemon } from '@domain/Pokemon'
import SimpleActionCard from '@module/SimpleActionCard/SimpleActionCard'
import Card from '@element/Card'
import IMessage from '@type/Message'

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
    const [message, setMessage] = useState<IMessage>()

    const handleSubmit = () => {
        setApi(apiAction(store.current, pokemon!))
    }

    useEffect(() => {
        if (response?.data?.assets.length > 0) {
            set(response.data)
        }

        error || response?.message && setMessage(error || response.message)

    }, [response])

    useEffect(() => {
        setMessage(undefined)

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
                    message={message}
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