<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { AccordionItem, Accordion, Modal } from "flowbite-svelte";
  import { readingPlanSelected, weekNumberSelected } from "./store";
  import PageHeading from "./PageHeading.svelte";
  import VerseReview from "./VerseReview.svelte";
  import * as readingPlanJSON from "../../readingPlans.json";

  let formattedMemoryVerseText: string[] = [];
  let toastMessage: string = "";
  let defaultModal = false;
  let isMemoryVerseLoading: boolean = false;

  onMount(() => {
    getMemoryVerse();
  });

  console.log("FROM STORE: ", $readingPlanSelected);

  async function getMemoryVerse() {
    try {
      isMemoryVerseLoading = true;
      const memoryVerseResponse = await axios.get(
        `https://bible-api.com/${readingPlanJSON[planSelected][weekNumber].memoryVerses}?translation=kjv`
      );

      formattedMemoryVerseText = memoryVerseResponse.data.verses.map(
        (verse: any) => verse.text.replace(/\n/g, " ")
      );

      // console.log("Formatted Memory Verse Text: ", formattedMemoryVerseText);
      isMemoryVerseLoading = false;
    } catch (error) {
      isMemoryVerseLoading = false;
      console.error("Error fetching proverb text:", error);
    }
  }

  function copyText(event: Event) {
    const target = event.target as HTMLElement;
    const text = target.innerText;
    navigator.clipboard.writeText(text);
    console.log("Copied:", text);
    defaultModal = true;
    showToast(`${text}`);
  }

  function showToast(message: string) {
    toastMessage = message;
  }

  let weekNumber;
  weekNumberSelected.subscribe((value) => {
    weekNumber = value;
    getMemoryVerse();
  });

  let planSelected;
  readingPlanSelected.subscribe((value) => {
    planSelected = value;
    getMemoryVerse();
  });

  console.log("READING PLAN SELECTED:", planSelected);
</script>

<main class="w-full px-5 pb-5">
  {#if toastMessage !== ""}
    <Modal title="Copied to clipboard:" bind:open={defaultModal} autoclose>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        "{toastMessage}"
      </p>
    </Modal>
  {/if}
  <PageHeading headerText="Memory Verses" />
  <Accordion
    class="rounded-xl bg-white dark:bg-gray-800"
    activeClasses="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
    inactiveClasses="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
  >
    <AccordionItem
      class="rounded-xl"
      activeClasses="rounded-t-lg  bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
    >
      <span slot="header"
        >{readingPlanJSON[planSelected][weekNumber].memoryVerses}</span
      >
      {#if isMemoryVerseLoading}
        <p>Loading...</p>
      {:else}
        <ul
          class="max-w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400"
        >
          {#each formattedMemoryVerseText as verse}
            <li
              class="mb-2 text-gray-500 dark:text-gray-400"
              on:click={copyText}
              on:keypress={copyText}
            >
              {verse}
            </li>
          {/each}
        </ul>
      {/if}
    </AccordionItem>
  </Accordion>
  <!-- <VerseReview /> -->
</main>
