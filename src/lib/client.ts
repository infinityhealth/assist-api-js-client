import { readFileSync } from "fs"

import yaml from "js-yaml"
import { OpenAPIClientAxios, type Document } from "openapi-client-axios"

import type { Client } from "./openapi.d.ts"

const definition = yaml.load(readFileSync("./src/lib/openapi.yml", "utf8")) as Document
const api = new OpenAPIClientAxios({ definition })

export async function init(base_url?: string) {
	await api.init<Client>()
	const client = await api.getClient<Client>()

	if (base_url) client.defaults.baseURL = base_url

	return client
}
