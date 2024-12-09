import { watch } from "node:fs"
import { $ } from "bun"

if (!process.env.OPENAPI_URL) {
	console.log("🚨 Please provide an `OPENAPI_URL` environment variable")
	console.log("👋 Goodbye!")
	process.exit(0)
}

await $`bun package`

console.log(`👀 Watching for changes to \x1b[35m${process.env.OPENAPI_URL}\x1b[0m`)

watch(process.env.OPENAPI_URL, async () => await $`bun package`)
