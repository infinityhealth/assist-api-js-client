import { $ } from "bun"
import yaml from "js-yaml"
import { Document } from "openapi-client-axios"

const url = "https://raw.githubusercontent.com/infinityhealth/infinity-api/main/openapi.yml"
const json_dest = "src/lib/openapi.json"
const ts_dest = "src/lib/openapi.d.ts"

const request = await fetch(url, {
	headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
})

if (!request.ok) {
	throw new Error(`Failed to fetch ${url}: ${request.status} ${request.statusText}`)
}

let json: Document

try {
	json = yaml.load(await request.text()) as Document
} catch (e) {
	throw new Error(`Failed to parse ${url} as YAML: ${e}`)
}

await $`echo ${JSON.stringify(json)} > ${json_dest}`

await $`bunx openapicmd typegen ${json_dest} > ${ts_dest}`

await $`bunx biome check --apply --no-errors-on-unmatched --files-ignore-unknown=true ${ts_dest} ${json_dest}`
