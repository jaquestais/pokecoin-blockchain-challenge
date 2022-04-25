import Default from '@layout/Default/Default'
import HistoryPage from '@template/HistoryPage/HistoryPage'
import { FC } from 'react'

interface IComponentProps {
}

const Home: FC<IComponentProps> = () => {
    return (
        <Default>
            <HistoryPage />
        </Default>
    )
}

export default Home