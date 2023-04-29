<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import {
    Heading,
    P,
    AccordionItem,
    Accordion,
    Toast,
    Modal,
  } from "flowbite-svelte";

  let currentDay: number;
  let proverbOfDay: number;
  let startPsalm: number;
  let endPsalm: number;
  let textOfProverbs: string[] = [];
  let isAccordionOpen: boolean = false;
  let toastMessage: string = "";
  let defaultModal = false;
  let isProverbsLoading: boolean = false;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  onMount(() => {
    currentDay = new Date().getDate();
    proverbOfDay = currentDay;
    startPsalm = currentDay * 5;
    endPsalm = startPsalm + 4;
    fetchProverbText();
  });

  async function fetchProverbText() {
    try {
      isProverbsLoading = true;
      const response = await axios.get(
        `https://labs.bible.org/api/?passage=Proverbs%20${proverbOfDay}&type=json`
      );

      let totalVersesInProverbs = response.data.map(
        (verse: any) => verse.text
      ).length;
      isProverbsLoading = false;
      console.log(
        `Proverbs ${proverbOfDay}; Total Verses in Chapter: ${totalVersesInProverbs}`
      );

      const additionalResponse = await axios.get(
        `https://bible-api.com/proverbs%20${proverbOfDay}:1-${totalVersesInProverbs}?translation=kjv`
      );

      textOfProverbs = additionalResponse.data.verses.map((verse: any) =>
        verse.text.replace(/\n/g, " ")
      );

      // console.log("textOfProverbs: ", textOfProverbs);
      isProverbsLoading = false;
    } catch (error) {
      isProverbsLoading = false;
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
</script>

<main class="w-full px-5 pb-5">
  {#if toastMessage !== ""}
    <Modal title="Copied to clipboard:" bind:open={defaultModal} autoclose>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        "{toastMessage}"
      </p>
    </Modal>
  {/if}
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >Daily Bible Reading</Heading
  >
  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400"
    >{formattedDate}</P
  >
  <Accordion
    activeClasses="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
    inactiveClasses="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
  >
    <AccordionItem>
      <span slot="header">Proverbs {proverbOfDay} </span>
      {#if isProverbsLoading}
        <p>Loading...</p>
      {:else}
        <ol
          class="max-w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
        >
          {#each textOfProverbs as verse}
            <li
              class="mb-2 text-gray-500 dark:text-gray-400"
              on:click={copyText}
              on:keypress={copyText}
            >
              {verse}
            </li>
          {/each}
        </ol>
      {/if}
    </AccordionItem>
    <AccordionItem>
      <span slot="header">Psalm {startPsalm}</span>
    </AccordionItem>
    <AccordionItem>
      <span slot="header">Psalm {startPsalm + 1}</span>
    </AccordionItem>
    <AccordionItem>
      <span slot="header">Psalm {startPsalm + 2}</span>
    </AccordionItem>
    <AccordionItem>
      <span slot="header">Psalm {startPsalm + 3}</span>
    </AccordionItem>
    <AccordionItem>
      <span slot="header">Psalm {startPsalm + 4}</span>
    </AccordionItem>
  </Accordion>
</main>
