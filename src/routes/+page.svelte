<script lang="ts">
  import { init } from "$lib/index.js"
  import { highlight } from "$lib/utils.js"

  const client = init("https://assist-dev-api.liaison.link")
  // ^ Initialize the client with the base URL (uses the base URL from the OpenAPI definition by default)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function example() {
    const result = await client.get_sso_configs()
    console.log(result)
  }
</script>

<h1>Assist API</h1>

{#await client.get_sso_configs()}
  Loading...
{:then result}
  <section>
    <header>
      <span>GET</span>
      /sso_configs
    </header>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <pre>{@html highlight(result)}</pre>
  </section>
{:catch}
  <p>Sorry, an error occurred.</p>
{/await}

<style>
  :global(body) {
    background: #14151a;
    color: white;
    font-family: "Inter", sans-serif;
    padding: 2vw;
  }

  span {
    color: #6bdd9a;
  }

  section {
    background: #282a36;
    border-radius: 4px;
  }

  header {
    border-bottom: 1px solid #454545;
    color: #7b7b7b;
    padding: 10px 20px;
    font-family: monospace;
  }

  pre {
    margin: 0;
    padding: 15px 20px;
    overflow: auto;
  }
</style>
