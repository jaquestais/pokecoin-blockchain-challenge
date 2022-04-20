import { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ISize, SizeOptions } from '@type/CustomTheme'

interface ComponentProps {
    gap?: SizeOptions,
    direction?: 'row' | 'column',
    align?: 'center' | 'left' | 'right',
    children: ReactNode,
}

const Container: FC<ComponentProps> = ({ gap, direction = 'row', align, children }) => {

    return (
        <ContainerStyle gap={gap} direction={direction} align={align} >
            {children}
        </ContainerStyle>
    )
}

const ContainerStyle = styled.div<ComponentProps>`
    padding: ${props => css`${props.theme.spacings.sm}px ${props.theme.spacings.xs}px`};
    display: flex;
    ${props => props.gap && css`gap: ${props.theme.spacings[props.gap as keyof ISize]}px`};    
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: ${props => props.direction};
    align-items: ${props => props.align};
`

export default Container