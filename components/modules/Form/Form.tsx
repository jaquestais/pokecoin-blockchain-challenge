import { IState } from '@type/CustomTheme'
import IMessage from '@type/Message'
import { FC, FormEvent, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Loader from '../../elements/Loader'

interface ComponentProps {
    onSubmit?: Function,
    loading?: boolean,
    message?: IMessage,
    children: ReactNode,
}

const Form: FC<ComponentProps> = ({ onSubmit, loading = false, message, children }) => {

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        onSubmit && onSubmit(event.target)
    }

    return (
        <Loader loading={loading}>
            <FormStyle onSubmit={handleSubmit} message={message?.state}>
                {children}
                {message && <div className={`state${message?.state}`}>{message?.description}</div>}
            </FormStyle>
        </Loader>
    )
}

const FormStyle = styled.form<{ message: string | undefined }>` 
    ${props => props.message && css`
        .state${props.message} {
            color: ${props.theme.colors[props.message as keyof IState]}
        }
    `};

${({ theme: { typography, colors, shapes } }) => css`
    display: flex;
    flex-direction: column;

    div:not(:last-child), span:not(:last-child) {
        margin-bottom: 7px;
    }

    h2 {
        margin-bottom: ${props => css`${props.theme.spacings.sm}px`}; 
    }

    label {
        font-size: ${typography.sizes.sm}px;
        margin-bottom: 4px;
    }

    input {
        padding: 10px;
        border: 1px solid ${colors.dark};
        border-radius: ${shapes.borderRadius.md}px;
        margin-bottom: 7px;
    }

    input:not(:last-child) {
        margin-bottom: 7px;
    }

    input::placeholder {
        color: ${colors.disabled};
        font-family: ${typography.fonts.secondary};
    }    
`}`

export default Form