Infinity API JS Client, generated using openapi-client-axios from the OpenAPI v3 definition.

- [openapi-client-axios](https://github.com/openapistack/openapi-client-axios) - Generates the main API client using Axios

# Installation

1. Setup a [Personal Access Token](https://github.com/settings/tokens) in order for your project to use this package.
2. Add environment variable for the project to store your Personal Access Token (ie. `GITHUB_TOKEN=foo`)
3. Configure your project to use GitHub Packages

   If you're using the Bun runtime, create a `bunfig.toml` file:

   ```toml
   [install.scopes]
   "@infinityhealth" = { token = "$GITHUB_TOKEN", url = "https://npm.pkg.github.com/" }
   ```

   For Node.js projects see the [GitHub Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package).

4. Install the package. Use the appropriate tag `dev`, `uat` or `latest` (main).
   ```sh
   bun add @infinityhealth/api-js-client@dev -D
   # or npm, yarn, pnpm etc.
   ```

# Usage

Create a file such as `client.ts` to store an instance of our JS Client.

```ts
import { init } from "@infinityhealth/api-js-client"

export const client = init("https://infinity-dev-api.infinity.health")
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

# Working with a local OpenAPI definition

If you want to work with a local OpenAPI definition (ie. you have the `infinity-api` repo setup), then you can:

1. Clone this repo and install its dependencies
2. Setup an `.env.local` file, with the absolute path to the OpenAPI file (ie. `OPENAPI_URL="/path/to/infinity-api/openapi.yaml"`)
3. Run `bun dev` to start the development server. This will watch for changes to the OpenAPI file and regenerate the client as needed.
4. From the front-end repo, reference this local repo instead of installing from remote. For example:

```json
{
  "@infinityhealth/api-js-client": "../api-js-client"
}
```
