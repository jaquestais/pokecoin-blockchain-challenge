import { FC, ReactNode } from 'react'
import { } from '@type/CustomTheme'
import Form from '@module/Form/Form'
import Button from '@element/Button'
import { IInputField } from '@type/Form'
import IMessage from '@type/Message'

interface IComponentProps {
    loading?: boolean,
    onSubmit: Function,
    field: IInputField,
    message?: IMessage,
    children: ReactNode,
}

const SimpleSearchForm: FC<IComponentProps> = ({ loading, onSubmit, field, message, children }) => {

    return (
        <section>
            <Form loading={loading} onSubmit={(target: any) => onSubmit(target)} message={message}>
                <h2>{children}</h2>
                <label htmlFor={field.name}>{field.label}:</label>
                <input type="text" id={field.name} name={field.name} defaultValue={field.input} placeholder='escreva aqui...' required />

                <Button type="submit">Procurar</Button>
            </Form>
        </section>
    )
}
export default SimpleSearchForm