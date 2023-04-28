<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { Heading, P, AccordionItem, Accordion } from "flowbite-svelte";

  let currentDay: number;
  let proverbOfDay: number;
  let startPsalm: number;
  let endPsalm: number;
  let textOfProverbs: string[] = [];
  let isAccordionOpen: boolean = false;

  onMount(() => {
    currentDay = new Date().getDate();
    proverbOfDay = currentDay;

    startPsalm = currentDay * 5;
    endPsalm = startPsalm + 4;
    fetchProverbText();
  });

  async function fetchProverbText() {
    try {
      const response = await axios.get(
        `https://labs.bible.org/api/?passage=Proverbs%20${proverbOfDay}&type=json`
      );

      let totalVersesInProverbs = response.data.map(
        (verse: any) => verse.text
      ).length;

      console.log(`Proverbs ${proverbOfDay}: ${totalVersesInProverbs}`);

      const additionalResponse = await axios.get(
        `https://bible-api.com/proverbs%20${proverbOfDay}:1-${totalVersesInProverbs}?translation=kjv`
      );

      console.log("additionalResponse: ", additionalResponse);

      textOfProverbs = additionalResponse.data.verses.map(
        (verse: any) => verse.text
      );

      console.log("textOfProverbs: ", textOfProverbs);

      isAccordionOpen = true;
    } catch (error) {
      console.error("Error fetching proverb text:", error);
    }
  }
</script>

<main class="w-full px-5">
  <!-- <h3>Proverb of the Day:</h3>
  <button on:click={fetchProverbText}>
    {#if isAccordionOpen}
      Hide Proverbs {proverbOfDay}
    {:else}
      Read Proverbs {proverbOfDay}
    {/if}
  </button>
  <br />
  <br />
  {#if isAccordionOpen}
    <ol>
      {#each textOfProverbs as verse}
        <li>{verse}</li>
      {/each}
    </ol>
  {/if}

  <h3>
    Psalms of the Day: {`Psalms ${startPsalm} - Psalms ${endPsalm}`}
  </h3> -->
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >Daily Bible Reading</Heading
  >
  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400"
    >Selected readings from wisdom literature from the Holy Bible.</P
  >
  <Accordion w-full>
    <AccordionItem>
      <span slot="header">Proverbs {proverbOfDay}</span>
      <ol
        class="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
      >
        {#each textOfProverbs as verse}
          <li class="mb-2 text-gray-500 dark:text-gray-400">{verse}</li>
        {/each}
      </ol>
      <!-- <p class="mb-2 text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab
        necessitatibus sint explicabo ...
      </p> -->
    </AccordionItem>
    <AccordionItem>
      <span slot="header">Psalms {startPsalm}</span>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab
        necessitatibus sint explicabo ...
      </p>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab
        necessitatibus sint explicabo ...
      </p>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        Learn more about these technologies:
      </p>
      <ul class="list-disc pl-5 dark:text-gray-400 text-gray-500">
        <li>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            class="text-blue-600 dark:text-blue-500 hover:underline"
            >Lorem ipsum</a
          >
        </li>
        <li>
          <a
            href="https://tailwindui.com/"
            rel="noreferrer"
            target="_blank"
            class="text-blue-600 dark:text-blue-500 hover:underline"
            >Tailwind UI</a
          >
        </li>
      </ul>
    </AccordionItem>
  </Accordion>
</main>
