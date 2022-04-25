import { FC } from 'react'
import { } from '@type/CustomTheme'
import styled, { css, DefaultTheme } from 'styled-components'
import Link from 'next/link'
import Container from '@element/Container'

const Menu: FC = () => {
    return (
        <MenuStyle>
            <Container as='ul' gap='sm'>
                <li>
                    <Link href={'/wallet/acquisition'}>
                        <a>Adquirir</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/wallet/remove'}>
                        <a>Vender</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/wallet/valuation'}>
                        <a>Valorização</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/wallet/history'}>
                        <a>Histórico</a>
                    </Link>
                </li>
            </Container>
        </MenuStyle>
    )
}

const MenuStyle = styled.nav`
${({ theme: { typography, colors, shapes } }: { theme: DefaultTheme }) => css`

    li {
        list-style: none;
        border-style: none;
        padding: 10px;        
        background-color: ${colors.dark};
        border-radius: ${shapes.borderRadius.md}px;
        font-weight: ${typography.weights.light};
        cursor: pointer;

        : hover {
            transition-duration: 0.3s;
            transform: scale(1.01);
        }
    
        :disabled {
            color: ${colors.disabled};
            cursor: not-allowed;
        }

        a {
            color: ${colors.light}; 
        }
    }
`}`

export default Menu