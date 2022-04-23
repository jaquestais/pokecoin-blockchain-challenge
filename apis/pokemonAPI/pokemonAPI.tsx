import { API_URL_POKE } from "@constant/apisUrl"

const getRequestInfo = async (nameOrId: string | number) => `${API_URL_POKE}/pokemon/${nameOrId}`

const pokemon = { getRequestInfo }

export default pokemon