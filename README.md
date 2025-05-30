![Hero](https://raw.githubusercontent.com/infinityhealth/assist-api-js-client/HEAD/hero.svg)

<p align="center">
  🏌️‍♂️ Liaison Assist API JS Client
  <br />
  Generated using <a href="https://github.com/openapistack/openapi-client-axios">openapi-client-axios</a> from the OpenAPI v3 definition
</p>

# Installation

Using your node runtime of choice install the package.

```sh
bun add @liaisongroup/assist-api-js-client -D
```

# Usage

Create a file such as `client.ts` to store an instance of our JS Client.

```ts
import { init } from "@liaisongroup/assist-api-js-client"

export const client = init("https://assist-dev-api.liaison.link")
// ^ returns a full typed client, with autocomplete for all methods, parameters etc.
```

Then when needed, just import this `client` in project files as needed.

`init` takes the API base URL as an optional argument, otherwise it will default to the value defined in the OpenAPI definition.

```ts
import { client } from "some/path/to/client"

async function make_api_call() {
  const sso_configs = await client.get_sso_configs()
}
```
