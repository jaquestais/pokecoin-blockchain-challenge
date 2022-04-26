import { ObjectId } from "mongodb";

interface Asset {
    _id?: ObjectId,
    name?: string,
    active?: boolean,
    costBasis: number,
}

class Wallet {
    constructor(public assets: Asset[], public _id?: ObjectId) { }
}

export default Wallet 
export type { Asset }