import { API_URL_POKE } from "@constant/apisUrl"

const getRequestInfo = (nameOrId: string | number) => new Request(`${API_URL_POKE}/pokemon/${nameOrId}`)

const pokemonAPI = { getRequestInfo }

export default pokemonAPI