import { ObjectId } from "mongodb";

interface Asset {
    _id?: ObjectId
}

class Wallet {
    constructor(public assets: Asset[], public _id?: ObjectId) { }
}

export default Wallet 
export type { Asset }