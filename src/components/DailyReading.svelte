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
      // isAccordionOpen = true;
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
    // setTimeout(() => {
    //   toastMessage = "";
    // }, 8000);
  }
</script>

<main class="w-full px-5 pb-5">
  <!-- <h3>
    Psalms of the Day: {`Psalms ${startPsalm} - Psalms ${endPsalm}`}
  </h3> -->
  {#if toastMessage !== ""}
    <!-- <Toast class="w-full">
      <svelte:fragment slot="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          /><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
          />
        </svg>
      </svelte:fragment>
      {toastMessage}
    </Toast> -->
    <Modal title="Copied to clipboard:" bind:open={defaultModal} autoclose>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        "{toastMessage}"
      </p>
      <!-- <svelte:fragment slot='footer'>
    <Button on:click={() => alert('Handle "success"')}>I accept</Button>
    <Button color="alternative">Decline</Button>
  </svelte:fragment> -->
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
