import { type Document, OpenAPIClientAxios } from "openapi-client-axios"
import definition from "./openapi.json"

import type { Client } from "./openapi.d.ts"

export function init(base_url?: string) {
	const client = new OpenAPIClientAxios({
		definition: definition as Document,
		axiosConfigDefaults: { baseURL: base_url },
	})

	return client.initSync<Client>()
}
