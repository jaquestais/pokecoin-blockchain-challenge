import getDatabaseConnection from "./connection"
import { ObjectId } from "mongodb";


class Pokemon {
    constructor(public name: string, public image: string, public baseExperience: number, public _id?: ObjectId) { }
}

class Wallet {
    constructor(public pokemons: Pokemon[], public _id?: ObjectId) { }
}

const saveWallet = async (wallet: Wallet) => {
    const db = await getDatabaseConnection()
    const query = { _id: new ObjectId(wallet._id) }
    return db.collection("wallets").replaceOne(query, wallet, { upsert: true });
}

const getUserWallet = async (id: string): Promise<Wallet | null> => {
    const query = { _id: new ObjectId(id) }
    const db = await getDatabaseConnection()
    return db.collection("wallets").findOne<Wallet>(query)
}

export default saveWallet
export { Wallet, Pokemon, getUserWallet }