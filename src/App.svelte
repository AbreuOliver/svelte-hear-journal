<script lang="ts">
  import Router, { location } from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<div class="w-full h-full">
  <div class="relative flex flex-col items-center w-full h-full">
    <Navbar />

    <div
      class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-[90vh] max-w-full"
    >
      <main
        class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-full max-w-[700px]"
      >
        <br />
        <!-- <Banner /> -->
        <Router {routes} />
      </main>
      {#if $location !== "/"}
        <Footer />
      {/if}
    </div>
  </div>
</div>
