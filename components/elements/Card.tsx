import { ISize, SizeOptions } from '@type/CustomTheme'
import { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

interface IComponentProps {
    solid?: boolean,
    paddingY?: SizeOptions,
    paddingX?: SizeOptions,
    minWidth?: number,
    maxWidth?: number,
    borderRadius?: SizeOptions,
    children: ReactNode,
}

const Card: FC<IComponentProps> = ({ solid = false, paddingY = 'lg', paddingX = 'md', minWidth, maxWidth, borderRadius = 'lg', children }) => {
    return (
        <CardStyle borderRadius={borderRadius} solid={solid} paddingY={paddingY} paddingX={paddingX} minWidth={minWidth} maxWidth={maxWidth}>
            <section>
                {children}
            </section>
        </CardStyle>
    )
}

const CardStyle = styled.div<IComponentProps>`
${props => css`
    --padding-y: ${props.theme.spacings[props.paddingY as keyof ISize]}px;
    --padding-x: ${props.theme.spacings[props.paddingX as keyof ISize]}px;

    overflow: hidden;
    border-radius: ${props.theme.shapes.borderRadius[props.borderRadius as keyof ISize]}px; 
    background-color: ${props.theme.colors.dark};
    color: ${props.theme.colors.light};
    padding: var(--padding-y) var(--padding-x);
    position: relative;
    width: 100%;
    ${props.minWidth && css`min-width: ${props.minWidth}`}px;
    ${props.maxWidth && css`max-width: ${props.maxWidth}`}px;
    
    ${!props.solid && css`
        background-color: transparent;
        color: ${props.theme.colors.dark};

        ::before {
            position: absolute;
            z-index: -1;
            content: '';        
            border-radius: ${props.theme.shapes.borderRadius.md}px; 
            background-color: ${props.theme.colors.light};
            box-shadow: 0 0 8px 10px ${props.theme.colors.light};
            height: calc(100% - 50px);
            width: calc(100% - 40px);
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }

        ::after {
            position: absolute;
            z-index: -2;
            content: ${props.theme.backgrounds.primary};        
            height: 100%;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    `}
`}`

export default Card