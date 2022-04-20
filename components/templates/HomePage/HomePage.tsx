import { FC } from 'react'
import styled from 'styled-components'
import { } from '@type/CustomTheme'
import Container from '@element/Container'
import Form from '@module/Form/Form'
import Button from '@element/Button'
import useApi from '@hook/useApi'
import saveWallet, { Wallet } from '@api/savePokemon'
import { ObjectId } from 'mongodb'

interface IComponentProps {
}

const HomePage: FC<IComponentProps> = () => {
    const urlRegisterPokemon = (nameOrId: string | number) => `api/pokemons/${nameOrId}`
    const [{ loading, data }, setApi] = useApi('api/pokemons')

    return (
        <HomePageStyle>
            <Container gap="md">
                <Form loading={loading} onSubmit={({ pokemon }: any) => setApi(urlRegisterPokemon(pokemon))}>
                    <h2>Cadastre um Pokemon que você capturou</h2>
                    <label htmlFor='pokemon'>Nome ou ID:</label>
                    <input type="text" id='pokemon' name='pokemon' placeholder='escreva aqui...' required />

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Container>
        </HomePageStyle >
    )
}

const HomePageStyle = styled.div`
    
`

export default HomePage