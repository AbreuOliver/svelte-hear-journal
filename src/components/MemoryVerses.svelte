<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import {
    AccordionItem,
    Accordion,
    Modal,
    Card,
    Video,
  } from "flowbite-svelte";
  import {
    readingPlanSelected,
    weekNumberSelected,
    selectedFontStyleForBibleText,
    themeColor,
  } from "./store";
  import PageHeading from "./PageHeading.svelte";
  // import VerseReview from "./VerseReview.svelte";
  import * as readingPlanJSON from "../../readingPlans.json";

  let formattedMemoryVerseText: string[] = [];
  let toastMessage: string = "";
  let defaultModal = false;
  let isMemoryVerseLoading: boolean = false;

  let bibleTextFontStyle;
  selectedFontStyleForBibleText.subscribe((value) => {
    bibleTextFontStyle = value;
  });

  console.log("FROM STORE: ", $readingPlanSelected);

  let planSelected;
  readingPlanSelected.subscribe((value) => {
    planSelected = value;
  });

  let weekNumber;
  weekNumberSelected.subscribe((value) => {
    weekNumber = value;
  });

  onMount(() => {
    getMemoryVerse();
  });

  $: {
    if (planSelected !== undefined && weekNumber !== undefined) {
      getMemoryVerse();
    }
  }

  async function getMemoryVerse() {
    try {
      isMemoryVerseLoading = true;
      const memoryVerseResponse = await axios.get(
        `https://bible-api.com/${readingPlanJSON[planSelected][weekNumber].memoryVerses}?translation=kjv`
      );

      formattedMemoryVerseText = memoryVerseResponse.data.verses.map(
        (verse: any) => verse.text.replace(/\n/g, " ")
      );

      isMemoryVerseLoading = false;
    } catch (error) {
      console.error("Error fetching Bible text:", error);
      isMemoryVerseLoading = false;
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
    activeClasses={`rounded-t-xl bg-${$themeColor}-50 dark:bg-gray-800 text-${$themeColor}-600 dark:text-white focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
    inactiveClasses={`text-gray-500 dark:text-gray-400 hover:bg-${$themeColor}-50 dark:hover:bg-gray-800`}
  >
    <AccordionItem
      class="rounded-xl"
      activeClasses={`rounded-xl bg-${$themeColor}-50 text-${$themeColor}-600 dark:text-${$themeColor}-500 focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
    >
      <span slot="header" class={`font-semibold`}
        >{readingPlanJSON[planSelected][weekNumber].memoryVerses}</span
      >
      {#if isMemoryVerseLoading}
        <p>Loading...</p>
      {:else}
        <ul
          class="max-w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400 {$selectedFontStyleForBibleText ===
          'Serif'
            ? 'font-serif'
            : 'text-sans'}"
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
  <!-- <Card shadow={false} class="mt-4">
    <Video
      class="controls"
      style="audio::-webkit-media-controls-panel: transparent;"
      src="//samplelib.com/lib/preview/mp3/sample-3s.mp3"
      controls="background: transparent;"
      controlslist="nodownload"
    />
  </Card> -->
</main>
