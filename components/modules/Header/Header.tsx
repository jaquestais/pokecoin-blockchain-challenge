import { FC, ReactNode } from 'react'
import { } from '@type/CustomTheme'
import styled, { css } from 'styled-components'
import Container from '@element/Container'

const Header: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <HeaderStyle>
            <Container gap='sm'>
                <h1>
                    <NoWrap>&harr; Wallet de</NoWrap> <NoWrap>Pokemons &harr;</NoWrap>
                </h1>
                {children}
            </Container>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
${({ theme: { backgrounds, spacings } }) => css`
    background-color: ${backgrounds.secondary};
    margin-bottom: ${spacings.sm}px;
`}`

const NoWrap = styled.span`
    white-space: nowrap;
`

export default Header