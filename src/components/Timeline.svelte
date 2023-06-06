<script lang="ts">
  import {
    Card,
    Heading,
    P,
    Timeline,
    TimelineItem,
    Button,
  } from "flowbite-svelte";
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
</script>

<main class="w-full px-5 pb-5">
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >Timeline</Heading
  >
  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400">
    View your past entries on this device
  </P>
  <Card class="shadow-none w-full max-w-lg" style="max-width: 100%;">
    {#if entries.length === 0}
      <p>
        Create and save your first entry on the <a
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="#/journal">journal page</a
        >!&nbsp;🙂
      </p>
    {:else}
      <Timeline>
        {#each entries as entry (entry.date)}
          <!-- <Card>
        <h2 class="dark:text-gray-50">{entry.date}</h2>
        <p>Verse: {entry.verse}</p>
        <p>Explanation: {entry.explanation}</p>
        <p>Application: {entry.application}</p>
        <p>Response: {entry.response}</p>
      </Card> -->
          <TimelineItem
            title={entry.verse}
            date={new Date(entry.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          >
            <p
              class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
            >
              {entry.application}
            </p>
            <Button color="light" style="margin-right: .5rem;"
              >View Image<svg
                class="ml-2 w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                /></svg
              ></Button
            ><Button color="light">View Text</Button>
          </TimelineItem>
        {/each}
      </Timeline>
    {/if}
  </Card>
</main>
