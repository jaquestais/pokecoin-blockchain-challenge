import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { } from '@type/CustomTheme'
import Form from '@module/Form/Form'
import Button from '@element/Button'
import Image from 'next/image'
import IMessage from '@type/Message'

interface IComponentProps {
    loading?: boolean,
    onSubmit: Function,
    title: ReactNode,
    image?: string,
    alt?: string,
    action: string,
    message?: IMessage,
    children: ReactNode,
}

const SimpleActionCard: FC<IComponentProps> = ({ loading, onSubmit, title, image, alt, action, message, children }) => (
    <SimpleActionCardStyle>
        <Form loading={loading} message={message} onSubmit={onSubmit}>
            <h2>{title}</h2>
            {image && <Image src={image} alt={alt} objectFit="cover" objectPosition="center" height={120} width={120} />}
            {!message && <div>{children}</div>}
            {!message && <Button type="submit" light>{action}</Button>}
        </Form>
    </SimpleActionCardStyle>
)

const SimpleActionCardStyle = styled.section`
    dl {
        margin-top: 15px;
    }

    dd {
        text-align: right;
        font-family: ${props => props.theme.typography.fonts.secondary};
        margin-top: 5px;
        margin-bottom: 15px;
        margin-left: 30px;
    }
`

export default SimpleActionCard