import getDatabaseConnection from "../databaseConnectionAPI"
import { ObjectId } from "mongodb"
import Wallet from "@domain/Wallet"

const saveWallet = async (collectionName: string, wallet: Wallet) => {
    const db = await getDatabaseConnection()
    const query = { _id: new ObjectId(wallet._id) }
    return db.collection(collectionName).replaceOne(query, wallet, { upsert: true });
}

const getUserWallet = async (collectionName: string, id: string): Promise<Wallet | null> => {
    const query = { _id: new ObjectId(id) }
    const db = await getDatabaseConnection()
    return db.collection(collectionName).findOne<Wallet>(query)
}

const WalletAPI = { getUserWallet, saveWallet }

export default WalletAPI