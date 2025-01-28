<script lang="ts">
  import { init } from "$lib/index.js"
  import { highlight } from "$lib/utils.js"

  const client = init("https://infinity-dev-api.infinity.health")
  // ^ Initialize the client with the base URL (uses the base URL from the OpenAPI definition by default)

  async function example() {
    const result = await client.get_sso_configs()

    result.map((data) => {
      console.log(data)
      // ^ Result is typed as AxiosResponse with API response
    })

    result.mapErr((err) => {
      if (err.response?.data) {
        if ("errors" in err.response?.data) {
          console.log(err.response?.data.errors)
        } else {
          console.log(err.response?.data.error)
        }
        // ^ Error is typed as AxiosError with API error response
      }
    })
  }
</script>

<h1>Infinity API</h1>

{#await client.get_sso_configs()}
  Loading...
{:then result}
  {#if result.isOk()}
    <section>
      <header>
        <span>GET</span>
        /sso_configs
      </header>
      <pre>{@html highlight(result)}</pre>
    </section>
  {:else}
    <p>Sorry, an error occurred: {result.error.message}</p>
  {/if}
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
  }
</style>
