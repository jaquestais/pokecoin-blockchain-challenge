import { MongoClient } from 'mongodb';

const getDatabaseConnection = async () => {
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();

    const db = client.db(process.env.MONGODB_DB!)

    return db
}

export default getDatabaseConnection
