import { FC, ReactNode } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import palette from '@style/palette'

interface ComponentProps {
    loading: boolean,
    children: ReactNode,
}

const Loader: FC<ComponentProps> = ({ loading, children }) => {

    const Loader = () => (
        <LoaderStyle color={palette.orange}>
            <div className="loaderContainer">
                <ul className="loaderSymbols">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            {children}
        </LoaderStyle>
    )

    return loading ? <Loader /> : <>{children}</>

}

const LoaderStyle = styled.div<{ theme: DefaultTheme }>`
    cursor: wait;

    .loaderContainer {
        background-color: ${props => props.theme.backgrounds.disabled};
        overflow: hidden;
        height: 100%;
        position: absolute;
        width: 100%;
        min-height: 150px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .loaderContainer ul {
        height: 100%;
        position: absolute;
        width: 100%;
        z-index: 2;
        margin: 0;
    }

    @keyframes preload {
        0% {
            background: ${props => props.color};
            opacity: 1
        }
        50% {
            background: ${props => props.theme.colors.light};
            opacity: 0.5
        }
        100% {
            background: ${props => props.color};
            opacity: 1
        }
    }

    .loaderContainer .loaderSymbols {
        display: block;
        height: 14px;
        margin: 0 auto;
        top: 50%;
        left: 94%;
        transform: translateY(-50%);
        transform: translateX(-50%);
        position: absolute;
        width: 100%;
        padding: 0;
    }

    .loaderContainer .loaderSymbols li {
        background: ${props => props.theme.colors.light};
        opacity: 0.5;
        display: block;
        float: left;
        width: 12px;
        height: 12px;
        border: 1px solid ${props => props.color};
        line-height: 12px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 50%;
    }

    .loaderContainer .loaderSymbols li:first-child {
        margin-left: 0
    }

    .loaderContainer .loaderSymbols li:nth-child(2) {
        animation-delay: .15s
    }

    .loaderContainer .loaderSymbols li:nth-child(3) {
        animation-delay: .3s
    }

    .loaderContainer.loaderContainer-complete {
        opacity: 0;
        visibility: hidden;
        transition-duration: 1s
    }
`

export default Loader