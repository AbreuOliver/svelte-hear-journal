<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import Banner from "./components/Banner.svelte";
</script>

<div class="w-full h-full">
  <div class="relative flex flex-col items-center w-full">
    <Navbar />

    <div
      class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-[90vh] max-w-full"
    >
      <main
        class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-full max-w-[700px]"
      >
        <br />
        <!-- <Banner /> -->
        <div
          id="sticky-banner"
          tabindex="-1"
          class="fixed bottom-[4rem] left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-yellow-300 dark:bg-blue-600 text-white dark:border-gray-600"
        >
          <div class="flex items-center mx-auto">
            <p
              class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              <span
                class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
                  />
                </svg>
                <span class="sr-only">Light bulb</span>
              </span>
              <span
                >Work in Progress: This app is currently in development and
                undergoing improvements.</span
              >
            </p>
          </div>
          <div class="flex items-center">
            <button
              data-dismiss-target="#sticky-banner"
              type="button"
              class="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                /></svg
              >
              <span class="sr-only">Close banner</span>
            </button>
          </div>
        </div>
        <Router {routes} />
      </main>
      <Footer />
    </div>
  </div>
</div>
