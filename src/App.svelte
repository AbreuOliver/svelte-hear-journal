<script lang="ts">
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import { onMount } from "svelte";
  import {
    DarkMode,
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";
  import ProgressBar from "./components/ProgressBar.svelte";
  import ReadingPlan from "./components/ReadingPlan.svelte";
  import Footer from "./components/Footer.svelte";

  let data;
  async function fetchData() {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT);
    data = await response.json();
  }
  onMount(fetchData);

  let steps = ["Info", "Address", "Payment", "Confirmation"],
    currentActive = 1,
    progressBar;

  const handleProgress = (stepIncrement) => {
    progressBar.handleProgress(stepIncrement);
  };
</script>

<div class="w-full h-full">
  <div class="relative flex flex-col items-center w-full">
    <div
      class="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-100 w-full flex items-center justify-center border-b z-20 sticky top-0 left-0"
    >
      <Navbar
        navClass="flex items-center w-full max-w-[700px] px-2 sm:px-4 py-2.5"
        let:hidden
        let:toggle
      >
        <div class="flex items-center justify-center w-full">
          <NavBrand style="display: flex; flex-grow: 1;" href="/">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span
              class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
              >Flowbite</span
            >
          </NavBrand>
          <DarkMode
            class="item-center justify-center grow-1 border-1 border-inherit"
          />
        </div>
      </Navbar>
    </div>
    <div
      class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-[100vh] max-w-full"
    >
      <div
        class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-[100vh] max-w-[700px]"
      >
        <br />
        <ReadingPlan />
      </div>
      <Footer />
    </div>
  </div>
</div>
