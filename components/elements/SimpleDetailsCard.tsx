import Image from 'next/image'
import { FC, ReactNode } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

interface IComponentProps {
    alt?: any,
    src: string,
    full?: boolean,
    children: ReactNode,
}

const SimpleDetailsCard: FC<IComponentProps> = ({ alt, src, full = false, children }) => (
    <SimpleDetailsCardStyle full={full}>
        <Image
            src={src}
            alt={alt}
            layout='fixed'
            objectFit='cover'
            objectPosition="center"
            height={80}
            width={80} />
        {children}
    </SimpleDetailsCardStyle>
)


const SimpleDetailsCardStyle = styled.div`
${(props: { theme: DefaultTheme, full: boolean }) => css`
    flex-grow: 1;
    flex-basis: ${props.full ? '100%' : '45%'};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border: 1px solid ${props.theme.colors.secondary};
    border-radius: 10px;
    color: ${props.theme.colors.dark};
    transition-property: color border;
    transition-duration: 0.3s;


    :hover {
        color: ${props.theme.colors.dark};
        border: 1px solid ${props.theme.colors.dark};
        transform: scale(1.01);
    }

    dt {
        font-weight: ${props.theme.typography.weights.bold};
    }
`}`

export default SimpleDetailsCard