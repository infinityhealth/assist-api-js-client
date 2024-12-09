import { readFile, writeFile } from "node:fs/promises"
import { $ } from "bun"
import yaml from "js-yaml"
import type { Document } from "openapi-client-axios"

const url = process.env.OPENAPI_URL

if (!url) {
	console.log("🚨 Please provide an `OPENAPI_URL` environment variable")
	console.log("👋 Goodbye!")
	process.exit(0)
}

const json_schema_dest = "src/lib/openapi.json"
const ts_schema_dest = "src/lib/openapi.d.ts"
const zod_schema_dest = "src/lib/openapi.zod.ts"
const zod_template = "src/lib/zod_template.hbs"

let json: Document

if (url.startsWith("http")) {
	const request = await fetch(url, {
		headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
	})

	if (!request.ok) {
		throw new Error(`Failed to fetch ${url}: ${request.status} ${request.statusText}`)
	}

	try {
		json = yaml.load(await request.text()) as Document
	} catch (e) {
		throw new Error(`Failed to parse ${url} as YAML: ${e}`)
	}
} else {
	json = (await import(url)) as Document
}

await $`echo ${JSON.stringify(json, null, 2)} > ${json_schema_dest}`

console.log("\n⏳ Generating TypeScript and Zod schemas...\n")

console.log(`   Creating \x1b[35m${ts_schema_dest}\x1b[0m and \x1b[35m${zod_schema_dest}\x1b[0m`)
await $`bunx openapicmd typegen ${json_schema_dest} > ${ts_schema_dest}`.quiet()
await $`bunx openapi-zod-client ${json_schema_dest} --media-type-expr="['application/vnd.api+json', 'application/json'].includes(mediaType)" -o ${zod_schema_dest} -t '${zod_template}' --export-schemas`.quiet()

const zod_schema_content = await readFile(zod_schema_dest, "utf8")
const cleaned_zod_schema_content = zod_schema_content.replace(/\.passthrough\(\)/g, "")

await writeFile(zod_schema_dest, cleaned_zod_schema_content)

console.log("   Checking TypeScript and Zod schemas...")
await $`bunx biome check --apply --no-errors-on-unmatched --files-ignore-unknown=true ${zod_schema_dest}`.quiet()

console.log("\n🎉 Done!\n")
