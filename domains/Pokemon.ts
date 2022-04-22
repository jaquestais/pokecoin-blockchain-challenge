import { ObjectId } from "mongodb";
import Wallet, { Asset } from "./Wallet";

class Pokemon implements Asset {
    constructor(public name: string, public image: string, public baseExperience: number, public registerDatetime: number, public _id?: ObjectId) { }
}

class PokemonWallet extends Wallet {
    constructor(public assets: Pokemon[], public _id?: ObjectId) {
        super(assets, _id)
    }
}

export { Pokemon, PokemonWallet }