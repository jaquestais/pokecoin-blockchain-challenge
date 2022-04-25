interface IMessage { 
    status: 'success' | 'error' | 'warning',
    description: string
}

export default IMessage