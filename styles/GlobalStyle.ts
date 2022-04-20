import { createGlobalStyle, css } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0; 
    }

    ${props => css`
        body {
                font-family: ${props.theme.typography.fonts.primary};
                color: ${props.theme.colors.dark};
                font-size: ${props.theme.typography.sizes.md};

                background-color: ${props.theme.colors.light};
                background-image: url('/squares.png');

                h1 {
                    font-size: ${props.theme.typography.sizes.lg}px;
                }

                h2 {
                    font-weight: ${props.theme.typography.weights.regular};
                }
            }
    `}
    
`

export default GlobalStyle