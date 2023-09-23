<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { AccordionItem, Accordion, Modal } from "flowbite-svelte";
  import {
    readingPlanSelected,
    weekNumberSelected,
    selectedFontStyleForBibleText,
    themeColor,
  } from "./store";
  import * as readingPlanJSON from "../../readingPlans.json";
  import PageHeading from "./PageHeading.svelte";

  const formattedBibleTextforPlanDay: string[][] = Array.from(
    { length: 5 },
    () => []
  );
  let toastMessage: string = "";
  let defaultModal = false;
  let isBibleReadingPlanLoading: boolean = false;

  onMount(() => {
    getBibleTextForPlans();
  });

  console.log(
    "ReadingPlan.svelte: Loading Reading Plan: ",
    isBibleReadingPlanLoading
  );

  let planSelected;
  readingPlanSelected.subscribe((value) => {
    planSelected = value;
    getBibleTextForPlans();
  });

  let weekNumber = undefined;
  weekNumberSelected.subscribe((value) => {
    weekNumber = value;
    getBibleTextForPlans();
  });

  let bibleTextFontStyle;
  selectedFontStyleForBibleText.subscribe((value) => {
    bibleTextFontStyle = value;
  });

  async function getBibleTextForPlans() {
    try {
      isBibleReadingPlanLoading = true;
      const plan = readingPlanJSON[planSelected][weekNumber].plan;

      const promises = plan.map(async (reference: string, i: number) => {
        const response = await axios.get(
          `https://bible-api.com/${reference}?translation=kjv`
        );

        formattedBibleTextforPlanDay[i] = response.data.verses.map(
          (verse: any) => verse.text.replace(/\n/g, " ")
        );
      });

      await Promise.all(promises);
      isBibleReadingPlanLoading = false;
    } catch (error) {
      console.error("Error fetching Bible text:", error);
      isBibleReadingPlanLoading = false;
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

  console.log("READING PLAN SELECTED:", planSelected);
</script>

<main class="w-full px-5 pb-[5rem]">
  {#if toastMessage !== ""}
    <Modal title="Copied to clipboard:" bind:open={defaultModal} autoclose>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        "{toastMessage}"
      </p>
    </Modal>
  {/if}
  <PageHeading headerText="Bible Reading" />
  <Accordion
    class="rounded-xl bg-white dark:bg-gray-800"
    activeClasses={`bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-white focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
    inactiveClasses="text-gray-500 dark:text-gray-100 hover:bg-${$themeColor}-100 dark:hover:bg-gray-800"
  >
    {#each readingPlanJSON[planSelected][weekNumber].plan as reference, i}
      <AccordionItem
        class="rounded-xl"
        activeClasses={`rounded-none bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-${$themeColor}-600 focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
      >
        <span slot="header">
          <span class="text-gray-800 dark:text-gray-400">Day {i + 1} • </span>
          {reference}
        </span>
        <ol
          class="max-w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
        >
          {#if isBibleReadingPlanLoading}
            <p>Loading...</p>
          {:else}
            {#each formattedBibleTextforPlanDay[i] as verse}
              <li
                class="mb-2 text-gray-500 dark:text-gray-400 {$selectedFontStyleForBibleText ===
                'Serif'
                  ? 'font-serif'
                  : 'text-sans'}"
                on:click={copyText}
                on:keypress={copyText}
              >
                {verse}
              </li>
            {/each}
          {/if}
        </ol>
      </AccordionItem>
    {/each}
  </Accordion>
</main>
