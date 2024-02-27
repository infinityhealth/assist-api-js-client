import { type Document, OpenAPIClientAxios } from "openapi-client-axios"
import schema from "./openapi.json"

import type { Client } from "./openapi.d.ts"

export function init(base_url?: string) {
	return new OpenAPIClientAxios({
		definition: schema as Document,
		axiosConfigDefaults: {
			baseURL: base_url,
		},
	}).initSync<Client>()
}
