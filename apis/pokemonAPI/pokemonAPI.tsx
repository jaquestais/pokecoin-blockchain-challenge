import { API_URL_POKE } from "@constant/apisUrl"

const getFetch = (nameOrId: string | number) => fetch(`${API_URL_POKE}/pokemon/${nameOrId}`)

const get = async (nameOrId: string[] | string | number) => await Promise.all([Array.isArray(nameOrId) ? nameOrId.map(getFetch) : getFetch(nameOrId)])

const pokemon = { get }

export default pokemon