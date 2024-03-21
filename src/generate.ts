import { readFile, writeFile } from "node:fs/promises"
import { $ } from "bun"
import yaml from "js-yaml"
import type { Document } from "openapi-client-axios"

const url = process.env.OPENAPI_URL
const json_schema_dest = "src/lib/openapi.json"
const ts_schema_dest = "src/lib/openapi.d.ts"
const zod_schema_dest = "src/lib/openapi.zod.ts"
const zod_template = "src/lib/zod_template.hbs"

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

await $`echo ${JSON.stringify(json)} > ${json_schema_dest}`

await $`bunx openapicmd typegen ${json_schema_dest} > ${ts_schema_dest}`
await $`bunx openapi-zod-client ${json_schema_dest} -o ${zod_schema_dest} -t '${zod_template}' --export-schemas`

const zod_schema_content = await readFile(zod_schema_dest, "utf8")
const cleaned_zod_schema_content = zod_schema_content.replace(/\.passthrough\(\)/g, "")

await writeFile(zod_schema_dest, cleaned_zod_schema_content)

await $`bunx biome check --apply --no-errors-on-unmatched --files-ignore-unknown=true ${ts_schema_dest} ${json_schema_dest} ${zod_schema_dest}`
