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
  });

  function getTimelineEntries() {
    const timelineData = localStorage.getItem("timeline");
    if (timelineData) {
      entries = JSON.parse(timelineData);
      entries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }

  let selectedEntry;
  let isModalOpen = false;

  function openModal(entry) {
    selectedEntry = entry;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>

<main class="w-full px-5 pb-5">
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
  >
    Timeline
  </Heading>

  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400">
    View your past entries on this device
  </P>

  {#if entries.length === 0}
    <p>
      Create and save your first entry on the
      <a
        class={`font-medium text-${themeColor}-600 dark:text-${themeColor}-500 hover:underline`}
        href="#/journal"
      >
        journal page
      </a>
      !&nbsp;🙂
    </p>
  {:else}
    <Timeline>
      {#each entries as entry (entry.date)}
        <TimelineItem
          title={entry.verse}
          date={new Date(entry.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "2-digit",
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
            <svg
              class="ml-2 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </Button>
        </TimelineItem>

        {#if isModalOpen}
          {#if selectedEntry === entry}
            <Modal
              title={entry.verse}
              size="lg"
              bind:open={isModalOpen}
              autoclose
              outsideclose
            >
              <p
                class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                {entry.explanation}
              </p>
              <p
                class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                {entry.application}
              </p>
              <svelte:fragment slot="footer">
                <Button
                  style="background-color: {$themeColor}; color: white;"
                  on:click={closeModal}
                >
                  Close
                </Button>
              </svelte:fragment>
            </Modal>
          {/if}
        {/if}
      {/each}
    </Timeline>
  {/if}
</main>
