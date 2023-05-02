<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { AccordionItem, Accordion, Modal } from "flowbite-svelte";
  import {
    readingPlanSelected,
    weekNumberSelected,
    selectedFontSyleForBibleText,
  } from "./store";
  import * as readingPlanJSON from "../../readingPlans.json";
  import PageHeading from "./PageHeading.svelte";

  let formattedBibleTextforPlanDay1: string[] = [];
  let formattedBibleTextforPlanDay2: string[] = [];
  let formattedBibleTextforPlanDay3: string[] = [];
  let formattedBibleTextforPlanDay4: string[] = [];
  let formattedBibleTextforPlanDay5: string[] = [];
  let toastMessage: string = "";
  let defaultModal = false;

  onMount(() => {
    getBibleTextForPlans();
  });

  async function getBibleTextForPlans() {
    try {
      const bibleTextforPlanDay1 = await axios.get(
        `https://bible-api.com/${readingPlanJSON[planSelected][weekNumber].plan[0]}?translation=kjv`
      );
      formattedBibleTextforPlanDay1 = bibleTextforPlanDay1.data.verses.map(
        (verse: any) => verse.text.replace(/\n/g, " ")
      );
      const bibleTextforPlanDay2 = await axios.get(
        `https://bible-api.com/${readingPlanJSON[planSelected][weekNumber].plan[1]}?translation=kjv`
      );
      formattedBibleTextforPlanDay2 = bibleTextforPlanDay2.data.verses.map(
        (verse: any) => verse.text.replace(/\n/g, " ")
      );
      const bibleTextforPlanDay3 = await axios.get(
        `https://bible-api.com/${readingPlanJSON[planSelected][weekNumber].plan[2]}?translation=kjv`
      );
      formattedBibleTextforPlanDay3 = bibleTextforPlanDay3.data.verses.map(
        (verse: any) => verse.text.replace(/\n/g, " ")
      );
      const bibleTextforPlanDay4 = await axios.get(
        `https://bible-api.com/${readingPlanJSON[planSelected][weekNumber].plan[3]}?translation=kjv`
      );
      formattedBibleTextforPlanDay4 = bibleTextforPlanDay4.data.verses.map(
        (verse: any) => verse.text.replace(/\n/g, " ")
      );
      const bibleTextforPlanDay5 = await axios.get(
        `https://bible-api.com/${readingPlanJSON[planSelected][weekNumber].plan[4]}?translation=kjv`
      );
      formattedBibleTextforPlanDay5 = bibleTextforPlanDay5.data.verses.map(
        (verse: any) => verse.text.replace(/\n/g, " ")
      );
    } catch (error) {
      console.error("Error fetching Bible text:", error);
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
  });

  let planSelected;
  readingPlanSelected.subscribe((value) => {
    planSelected = value;
  });

  let bibleTextFontStyle;
  selectedFontSyleForBibleText.subscribe((value) => {
    bibleTextFontStyle = value;
  });

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
    activeClasses="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
    inactiveClasses="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
  >
    <AccordionItem>
      <span slot="header"
        ><span class="text-gray-800 dark:text-gray-100">Day 1 • </span>
        {readingPlanJSON[planSelected][weekNumber].plan[0]}</span
      >
      <ol
        class="max-w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
      >
        {#each formattedBibleTextforPlanDay1 as verse}
          <li
            class="mb-2 text-gray-500 dark:text-gray-400 {bibleTextFontStyle}"
            on:click={copyText}
            on:keypress={copyText}
          >
            {verse}
          </li>
        {/each}
      </ol>
    </AccordionItem>
    <AccordionItem class="sticky">
      <span slot="header"
        ><span class="text-gray-800 dark:text-gray-100"
          >Day 2 •
        </span>{readingPlanJSON[planSelected][weekNumber].plan[1]}</span
      >
      <ol
        class="max-w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
      >
        {#each formattedBibleTextforPlanDay2 as verse}
          <li
            class="mb-2 text-gray-500 dark:text-gray-400"
            on:click={copyText}
            on:keypress={copyText}
          >
            {verse}
          </li>
        {/each}
      </ol>
    </AccordionItem>
    <AccordionItem class="sticky">
      <span slot="header"
        ><span class="text-gray-800 dark:text-gray-100"
          >Day 3 •
        </span>{readingPlanJSON[planSelected][weekNumber].plan[2]}</span
      >
      <ol
        class="max-w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
      >
        {#each formattedBibleTextforPlanDay3 as verse}
          <li
            class="mb-2 text-gray-500 dark:text-gray-400"
            on:click={copyText}
            on:keypress={copyText}
          >
            {verse}
          </li>
        {/each}
      </ol>
    </AccordionItem>
    <AccordionItem class="sticky">
      <span slot="header"
        ><span class="text-gray-800 dark:text-gray-100"
          >Day 4 •
        </span>{readingPlanJSON[planSelected][weekNumber].plan[3]}</span
      >
      <ol
        class="max-w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
      >
        {#each formattedBibleTextforPlanDay4 as verse}
          <li
            class="mb-2 text-gray-500 dark:text-gray-400"
            on:click={copyText}
            on:keypress={copyText}
          >
            {verse}
          </li>
        {/each}
      </ol>
    </AccordionItem>
    <AccordionItem class="sticky">
      <span slot="header"
        ><span class="text-gray-800 dark:text-gray-100"
          >Day 5 •
        </span>{readingPlanJSON[planSelected][weekNumber].plan[4]}</span
      >
      <ol
        class="max-w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
      >
        {#each formattedBibleTextforPlanDay5 as verse}
          <li
            class="mb-2 text-gray-500 dark:text-gray-400"
            on:click={copyText}
            on:keypress={copyText}
          >
            {verse}
          </li>
        {/each}
      </ol>
    </AccordionItem>
  </Accordion>
</main>
