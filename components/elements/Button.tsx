import { FC, MouseEventHandler, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { } from '@type/CustomTheme'

interface IComponentProps {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    type?: "button" | "submit" | "reset",
    children: ReactNode,
}

const Button: FC<IComponentProps> = ({ onClick, disabled, type, children }) => {
    return (
        <ButtonStyle type={type} onClick={onClick} disabled={disabled}>
            {children}
        </ButtonStyle>
    )
}

const ButtonStyle = styled.button`
${({ theme: { typography, colors, shapes } }) => css`

    border-style: none;
    padding: 10px;
    color: ${colors.light}; 
    background-color: ${colors.dark};
    border-radius: ${shapes.borderRadius.md}px;
    font-weight: ${typography.weights.bold};
    cursor: pointer;


    : hover {
        transition-duration: 0.3s;
        transform: scale(1.01);
    }

    :not(:last-child) {
        margin-bottom: 10px;
    }

    :disabled {
        color: ${colors.disabled};
        cursor: not-allowed;
    }
`}`

export default Button