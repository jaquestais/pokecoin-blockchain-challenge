import Link from 'next/link'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

interface IComponentProps {
    href?: any,
    path?: string,
    query?: any,
    alt?: any,
    src: string,
    children: ReactNode,
}

const CardLink: FC<IComponentProps> = ({ href, path, query, alt, src, children }) => {
    const hrefConfig = href ? href : { pathname: path, query }

    return (
        <CardLinkStyle>
            <Link href={hrefConfig}>
                <a className='link'>
                    <Image
                        src={src}
                        alt={alt}
                        objectFit='cover'
                        objectPosition='top'
                        height={40}
                        width={40}
                    />
                    {children}
                </a>
            </Link>
        </CardLinkStyle>
    )
}

const CardLinkStyle = styled.div`
${props => css`    
    .link {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        border: 1px solid ${props.theme.colors.secondary};
        border-radius: 10px;
        color: ${props.theme.colors.secondary};
        transition-property: color border;
        transition-duration: 0.3s;
    }

    .link:hover {
        color: ${props.theme.colors.dark};
        border: 1px solid ${props.theme.colors.dark};
        transform: scale(1.01);
    }
`}`

export default CardLink