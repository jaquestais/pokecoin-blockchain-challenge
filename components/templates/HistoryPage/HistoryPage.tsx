import { FC } from 'react'
import styled from 'styled-components'
import { } from '@type/CustomTheme'
import Container from '@element/Container'

interface IComponentProps {
}

const HistoryPage: FC<IComponentProps> = () => {

    return (
        <HistoryPageStyle>
            <Container gap="md">
            </Container>
        </HistoryPageStyle>
    )
}

const HistoryPageStyle = styled.div`
    
`

export default HistoryPage