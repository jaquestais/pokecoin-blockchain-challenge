import customTheme from '@style/customTheme'
import GlobalStyle from '@style/GlobalStyle'
import { FC } from 'react'
import { ThemeProvider } from 'styled-components'

interface IProps {
    Component: any,
    pageProps: any
}

const App: FC<IProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={customTheme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default App