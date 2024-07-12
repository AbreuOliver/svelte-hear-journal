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
  import { each } from "svelte/internal";
  import About from "./About.svelte";

  const formattedBibleTextforPlanDay: string[][] = Array.from(
    { length: 5 },
    () => []
  );

  let toastMessage: string = "";
  let defaultModal = false;
  let isBibleReadingPlanLoading: boolean = false;

  let weekNumber = undefined;
  weekNumberSelected.subscribe((value) => {
    weekNumber = value;
  });

  let planSelected;
  readingPlanSelected.subscribe((value) => {
    planSelected = value;
  });

  console.log("Plan Selected: ", planSelected);

  let bibleTextFontStyle;
  selectedFontStyleForBibleText.subscribe((value) => {
    bibleTextFontStyle = value;
  });

  console.log(
    "ReadingPlan.svelte: Loading Reading Plan: ",
    isBibleReadingPlanLoading
  );

  let isToggled: boolean = false;

  onMount(() => {
    getBibleTextForPlans();
    isToggled = false;
  });

  $: {
    if (planSelected !== undefined && weekNumber !== undefined) {
      getBibleTextForPlans();
    }
  }

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

  function activateToggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    isToggled = !isToggled;
    console.log("Clicked toggle!", isToggled);
  }

  function convertToBibleLink(bookReference: string): string {
    const abbreviations: { [key: string]: string } = {
      Genesis: "gen",
      Exodus: "exo",
      Leviticus: "lev",
      Numbers: "num",
      Deuteronomy: "deu",
      Joshua: "jos",
      Judges: "jdg",
      Ruth: "rut",
      "1 Samuel": "1sa",
      "2 Samuel": "2sa",
      "1 Kings": "1ki",
      "2 Kings": "2ki",
      "1 Chronicles": "1ch",
      "2 Chronicles": "2ch",
      Ezra: "ezr",
      Nehemiah: "neh",
      Esther: "est",
      Job: "job",
      Psalm: "psa",
      Proverbs: "pro",
      Ecclesiastes: "ecc",
      "Song of Solomon": "sng",
      Isaiah: "isa",
      Jeremiah: "jer",
      Lamentations: "lam",
      Ezekiel: "ezk",
      Daniel: "dan",
      Hosea: "hos",
      Joel: "jol",
      Amos: "amo",
      Obadiah: "oba",
      Jonah: "jon",
      Micah: "mic",
      Nahum: "nam",
      Habakkuk: "hab",
      Zephaniah: "zep",
      Haggai: "hag",
      Zechariah: "zec",
      Malachi: "mal",
      Matthew: "mat",
      Mark: "mrk",
      Luke: "luk",
      John: "jhn",
      Acts: "act",
      Romans: "rom",
      "1 Corinthians": "1co",
      "2 Corinthians": "2co",
      Galatians: "gal",
      Ephesians: "eph",
      Philippians: "php",
      Colossians: "col",
      "1 Thessalonians": "1th",
      "2 Thessalonians": "2th",
      "1 Timothy": "1ti",
      "2 Timothy": "2ti",
      Titus: "tit",
      Philemon: "phm",
      Hebrews: "heb",
      James: "jas",
      "1 Peter": "1pe",
      "2 Peter": "2pe",
      "1 John": "1jn",
      "2 John": "2jn",
      "3 John": "3jn",
      Jude: "jud",
      Revelation: "rev",
    };

    const bookMatch = bookReference.match(/(.+?)(?:\s+(\d+))?$/);
    const book = bookMatch && bookMatch[1].trim();
    const chapter = bookMatch && bookMatch[2] ? bookMatch[2] : "1";

    const bookAbbrev = abbreviations[book];

    console.log(
      "Book Reference: ",
      bookReference,
      "\nAbbreviation: ",
      bookAbbrev,
      "\nInput: ",
      bookReference,
      "\nBook: ",
      book,
      "\nChapter: ",
      chapter,
      "\nURL: ",
      `${bookAbbrev}.${chapter}`
    );

    return bookAbbrev
      ? `https://www.bible.com/bible/1/${bookAbbrev}.${chapter}.KJV`
      : "Book abbreviation not found.";
  }
  console.log(
    "😜 Number of plan references: ",
    readingPlanJSON[planSelected][weekNumber].plan.length
  );
</script>

<main class="w-full px-5 pb-[25%]">
  {#if toastMessage !== ""}
    <Modal title="Copied to clipboard:" bind:open={defaultModal} autoclose>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        "{toastMessage}"
      </p>
    </Modal>
  {/if}
  <PageHeading headerText="Bible Reading" />
  <div class="flex min-w-[100%] items-center mb-6">
    <span
      class="ml-2 min-w-[fit-content] mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      Read in YouVersion
    </span>
    <div class="ml-2 w-full flex justify-start items-center">
      <label
        class="relative inline-flex items-center cursor-pointer"
        on:click={activateToggle}
        on:keydown={activateToggle}
      >
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          bind:checked={isToggled}
        />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-{$themeColor}-300 dark:peer-focus:ring-{$themeColor}-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-{$themeColor}-600"
        />
        {#if isToggled}
          <span
            class="ml-2 mr-8 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            On
          </span>
        {:else}
          <span
            class="ml-2 mr-8 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Off
          </span>
        {/if}
      </label>
    </div>
  </div>
  {#if !isToggled}
    <Accordion
      class="rounded-xl bg-white dark:bg-gray-800"
      activeClasses={`bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-white focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
      inactiveClasses="text-gray-500 dark:text-gray-100 hover:bg-${$themeColor}-100 dark:hover:bg-gray-800"
    >
      {#each readingPlanJSON[planSelected][weekNumber].plan as reference, i}
        {#if readingPlanJSON[planSelected][weekNumber].plan.length < 10}
          <AccordionItem
            class="rounded-xl"
            activeClasses={`rounded-none bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-${$themeColor}-600 focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
          >
            <span slot="header">
              <span class="text-gray-800 dark:text-gray-400"
                >Day {i + 1} •
              </span>
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
        {:else if i % 2 === 0}
          {#if i === 0}
            <AccordionItem
              class="rounded-xl"
              activeClasses={`rounded-none bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-${$themeColor}-600 focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
            >
              <span slot="header">
                <span class="text-gray-800 dark:text-gray-400">
                  Day {Math.floor(i / 2) + 1}A •
                </span>
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
          {:else if i === 9}
            <AccordionItem
              class="rounded-xl"
              activeClasses={`rounded-none bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-${$themeColor}-600 focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
            >
              <span slot="header">
                <span class="text-gray-800 dark:text-gray-400">
                  Day {Math.floor(i / 2) + 1}B •
                </span>
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
          {:else}
            <AccordionItem
              class="rounded-xl"
              activeClasses={`rounded-none bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-${$themeColor}-600 focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
            >
              <span slot="header">
                <span class="text-gray-800 dark:text-gray-400">
                  Day {Math.floor(i / 2) + 1}A •
                </span>
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
          {/if}
        {:else}
          <AccordionItem
            class="rounded-xl"
            activeClasses={`rounded-none bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-${$themeColor}-600 focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
          >
            <span slot="header">
              <span class="text-gray-800 dark:text-gray-400">
                Day {Math.floor(i / 2) + 1}B •
              </span>
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
        {/if}
      {/each}
    </Accordion>
  {:else}
    <p
      class="ml-2 mb-6 text-sm font-medium text-{$themeColor}-600 dark:text-{$themeColor}-600"
    >
      Tap the day's reference to open
    </p>
    <div
      id="accordion-collapse"
      class={`rounded-xl bg-white dark:bg-gray-800 bg-${$themeColor}-100 dark:bg-${$themeColor}-700 text-${$themeColor}-600 dark:text-white focus:ring-4 focus:ring-${$themeColor}-200 dark:focus:ring-${$themeColor}-800`}
      data-accordion="collapse"
    >
      {#each readingPlanJSON[planSelected][weekNumber].plan as reference, i}
        {#if readingPlanJSON[planSelected][weekNumber].plan.length < 10}
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <a href={convertToBibleLink(reference)}>
                <span class="flex items-center justify-center">
                  <span class="text-gray-800 dark:text-gray-400 mr-2"
                    >Day {i + 1} •
                  </span>
                  {reference}
                  <svg
                    class="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#757c89"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M7 17l9.2-9.2M17 17V7H7" /></svg
                  >
                </span>
              </a>
            </button>
          </h2>
        {:else if i % 2 === 0}
          {#if i === 0}
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-xl"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <a href={convertToBibleLink(reference)}>
                <span class="flex items-center justify-center">
                  <span class="text-gray-800 dark:text-gray-400 mr-2"
                    >Day {Math.floor(i / 2) + 1}A •
                  </span>
                  {reference}
                  <svg
                    class="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#757c89"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M7 17l9.2-9.2M17 17V7H7" /></svg
                  >
                </span>
              </a>
            </button>
          {:else if i === 9}
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <a href={convertToBibleLink(reference)}>
                <span class="flex items-center justify-center">
                  <span class="text-gray-800 dark:text-gray-400 mr-2"
                    >Day {i + 1}B •
                  </span>
                  {reference}
                  <svg
                    class="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#757c89"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M7 17l9.2-9.2M17 17V7H7" /></svg
                  >
                </span>
              </a>
            </button>
          {:else}
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <a href={convertToBibleLink(reference)}>
                <span class="flex items-center justify-center">
                  <span class="text-gray-800 dark:text-gray-400 mr-2"
                    >Day {Math.floor(i / 2) + 1}A •
                  </span>
                  {reference}
                  <svg
                    class="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#757c89"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M7 17l9.2-9.2M17 17V7H7" /></svg
                  >
                </span>
              </a>
            </button>
          {/if}
        {:else}
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
          >
            <a href={convertToBibleLink(reference)}>
              <span class="flex items-center justify-center">
                <span class="text-gray-800 dark:text-gray-400 mr-2"
                  >Day {Math.floor(i / 2) + 1}B •
                </span>
                {reference}
                <svg
                  class="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#757c89"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M7 17l9.2-9.2M17 17V7H7" /></svg
                >
              </span>
            </a>
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</main>
