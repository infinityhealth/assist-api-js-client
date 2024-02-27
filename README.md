Infinity API JS Client, generated using [openapi-client-axios](https://github.com/openapistack/openapi-client-axios) from the [OpenAPI v3 definition](https://github.com/openapistack/openapi-client-axios).

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

4. Install the package
   ```sh
   bun add @infinityhealth/api-js-client -D
   # or npm, yarn, pnpm etc.
   ```

# Usage

Create a file such as `client.ts` to store an instance of our JS Client.

```ts
import { init } from "@infinityhealth/api-js-client";

export const client = init("https://infinity-dev-api.infinity.health");
// ^ returns a full typed client, with autocomplete for all methods, parameters etc.
```

Then when needed, just import this `client` in project files as needed.

```ts
import { client } from "some/path/to/client";

async function make_api_call() {
  const sso_configs = await client.get_sso_configs();
  // ^ returns axios response with data from API call
}
```

`init` takes the API base URL as an optional argument, otherwise it will default to the value defined in the OpenAPI definition.
