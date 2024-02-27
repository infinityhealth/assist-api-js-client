<script lang="ts">
  import { init } from "$lib/index.js";
  import { highlight } from "$lib/utils.js";

  const client = init("https://infinity-dev-api.infinity.health");
</script>

<h1>Infinity API</h1>

{#await client.get_sso_configs()}
  Loading...
{:then { data }}
  <section>
    <header>
      <span>GET</span>
      /sso_configs
    </header>
    <pre>{@html highlight(data)}</pre>
  </section>
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
