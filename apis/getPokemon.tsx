import { API_URL_POKE } from "@constant/apisUrl"

const getPokemon = (nameOrId: string | number) => {

    return fetch(`${API_URL_POKE}/pokemon/${nameOrId}`)
}

export default getPokemon