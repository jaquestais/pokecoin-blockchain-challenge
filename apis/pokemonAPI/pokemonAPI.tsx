import { API_URL_POKE } from "@constant/apisUrl"

const getFetch = (nameOrId: string | number) => fetch(`${API_URL_POKE}/pokemon/${nameOrId}`)

const get = async (nameOrId: string | number) => await getFetch(nameOrId)

const pokemon = { get }

export default pokemon