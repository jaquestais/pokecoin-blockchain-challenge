import { FC, ReactNode } from 'react'
import { } from '@type/CustomTheme'
import Header from '@module/Header/Header'
import Footer from '@module/Footer/Footer'
import Menu from '@module/Menu/Menu'

const Default: FC<{ children: ReactNode }> = ({ children }) => (
    <div>
        <Header><Menu /></Header>
        <main>
            {children}
        </main>
        <Footer />
    </div>
)

export default Default