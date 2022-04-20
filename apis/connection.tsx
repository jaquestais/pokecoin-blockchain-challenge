import { MongoClient } from 'mongodb';

const getDatabaseConnection = async () => {
    const client = new MongoClient('mongodb+srv://pokecoin-admin:pEEqb75GmJxGZ8bx@clusterpokecoin.oeqj8.mongodb.net/pokecoindb?retryWrites=true&w=majority');
    await client.connect();


    const db = client.db("pokecoindb")

    return db
}

export default getDatabaseConnection
