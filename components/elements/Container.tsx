import { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ISize, SizeOptions } from '@type/CustomTheme'

interface ComponentProps {
    as?: keyof JSX.IntrinsicElements,
    gap?: SizeOptions,
    direction?: 'row' | 'column',
    paddingY?: SizeOptions,
    paddingX?: SizeOptions,
    children: ReactNode,
}

const Container: FC<ComponentProps> = ({ as = 'div', gap, direction = 'row', paddingY = 'sm', paddingX = 'xs', children }) => {

    return (
        <ContainerStyle as={as} gap={gap} direction={direction} paddingY={paddingY} paddingX={paddingX} >
            {children}
        </ContainerStyle>
    )
}

const ContainerStyle = styled.div<ComponentProps>`
    padding: ${props => css`${props.theme.spacings[props.paddingY as keyof ISize]}px ${props.theme.spacings[props.paddingX as keyof ISize]}px`};
    display: flex;
    ${props => props.gap && css`gap: ${props.theme.spacings[props.gap as keyof ISize]}px`};    
    flex-wrap: wrap;
    flex-direction: ${props => props.direction};
    align-items: center;
    justify-content: center;
    text-align: center;
`

export default Container