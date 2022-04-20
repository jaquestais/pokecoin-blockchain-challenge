import { FC, ReactNode } from 'react'
import { } from '@type/CustomTheme'

const Footer: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <footer>
            {children}
        </footer>
    )
}

export default Footer