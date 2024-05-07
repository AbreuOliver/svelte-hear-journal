<script lang="ts">
  import {
    Heading,
    P,
    Timeline,
    TimelineItem,
    Button,
    Modal,
  } from "flowbite-svelte";
  import { themeColor } from "./store";
  import { onMount } from "svelte";

  let entries = [];

  const items = { ...localStorage };

  onMount(() => {
    getTimelineEntries();
    entries.forEach(async (entry) => {
        await getVerseForEntry(entry);
    });
  });

  async function getVerseForEntry(entry) {
    try {
        // Perform your API call or any other data retrieval method here
        const verseResponse = await fetch(`https://bible-api.com/${entry.verse}?translation=kjv`);
        const verseData = await verseResponse.json();

        // You can update the entry with the fetched verse data
        entry.verseText = verseData.text.replace(/\n/g, ' '); // Assuming the fetched text is in 'text' property

    } catch (error) {
        console.error('Error fetching Bible text:', error);
    }
}

  function getTimelineEntries() {
    const timelineData = localStorage.getItem("timeline");
    if (timelineData) {
      entries = JSON.parse(timelineData);
      entries.sort((a, b) => b.id - a.id);
    }
  }

  let selectedEntry;
  let isModalOpen = false;

  function openModal(entry) {
    selectedEntry = entry;
    isModalOpen = true;
    console.log("Selected entry ID:", entry.id);
  }

  function closeModal() {
    selectedEntry = null;
    isModalOpen = false;
  }

  function deleteEntry(entry) {
    // Implement the logic to delete the entry here
    console.log("Deleting entry:", entry);

    // Filter out the entry to be deleted from the `entries` array
    entries = entries.filter((e) => e.id !== entry.id);

    // Save the updated entries array to `localStorage`
    localStorage.setItem("timeline", JSON.stringify(entries));

    closeModal();
  }


</script>

<main class="w-full px-5 pb-10" style="z-index: 1; padding-bottom: 5rem;">
  <Heading
    tag="h2"
    class="my-4 text-left mb-8"
    customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl"
  >
    Timeline
  </Heading>

  {#if entries.length === 0}
    <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400">
      View your past entries on this device
    </P>
    <p class="dark:text-white">
      Create and save your first entry on the
      <a
        class={`font-medium text-${$themeColor}-600 dark:text-${$themeColor}-500 hover:underline`}
        href="#/journal"
      >
        journal page
      </a>
      !&nbsp;🙂
    </p>
  {:else}
    <Timeline>
      {#each entries as entry (entry.id)}
        <TimelineItem
          title={entry.verse}
          date={new Date(entry.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        >
          <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            {entry.application}
          </p>
          <Button
            color="light"
            on:click={() => openModal(entry)}
            style="margin-right: .5rem;"
          >
            View Details
          </Button>
        </TimelineItem>
      {/each}
    </Timeline>

    {#if isModalOpen}
      {#if selectedEntry}
        <Modal
          title={selectedEntry.verse}
          size="lg"
          bind:open={isModalOpen}
          autoclose
          outsideclose
          class="space-y-2"
        >
          <div>
            <h2 class={`mb-1 font-semibold text-${$themeColor}-600`}>
              Highlight
            </h2>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
            <span style="font-style: italic;">"{selectedEntry.verseText}"</span>
            </p>
          </div>
          <div>
            <h2 class={`mb-1 font-semibold text-${$themeColor}-600`}>
              Explanation
            </h2>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {selectedEntry.explanation}
            </p>
          </div>
          <div>
            <h2 class={`mb-1 font-semibold text-${$themeColor}-600`}>
              Application
            </h2>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {selectedEntry.application}
            </p>
          </div>
          <!-- <svelte:fragment slot="footer">
            <div
              style="width: 100%; display: flex; justify-content: flex-start;"
            >
              <Button
                style="flex-grow: 2;"
                color="alternative"
                on:click={closeModal}>Close</Button
              >
              <Button
                class="ml-6"
                color="red"
                on:click={() => deleteEntry(selectedEntry)}
              >
                Delete Entry
              </Button>
            </div>
          </svelte:fragment> -->
        </Modal>
      {/if}
    {/if}
  {/if}
</main>
