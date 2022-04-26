import { } from '@type/CustomTheme'
import Container from '@element/Container'
import Wallet from '@domain/Wallet'
import { FC } from 'react'

interface IComponentProps {
    wallet: Wallet,
}

const HistoryTemplate: FC<IComponentProps> = ({ wallet }) => {

    return (
        <Container gap="md" direction='column' >
            Ola
        </Container>
    )
}

export default HistoryTemplate