import { $ } from "bun"

const url = "https://raw.githubusercontent.com/infinityhealth/infinity-api/main/openapi.yml"
const yml_dest = "src/lib/openapi.yml"
const ts_dest = "src/lib/openapi.d.ts"

const request = await fetch(url, {
	headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
})

if (!request.ok) {
	throw new Error(`Failed to fetch ${url}: ${request.status} ${request.statusText}`)
}

const yml = await request.text()
await $`echo ${yml} > ${yml_dest}`

await $`bunx openapicmd typegen ${yml_dest} > ${ts_dest}`

await $`bunx biome check --apply --no-errors-on-unmatched --files-ignore-unknown=true ${ts_dest}`
