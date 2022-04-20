import Default from '@layout/Default/Default'
import HomePage from '@template/HomePage/HomePage'
import { FC } from 'react'

interface IComponentProps {
}

const Home: FC<IComponentProps> = () => {
    return (
        <Default>
            <HomePage />
        </Default>
    )
}

export default Home