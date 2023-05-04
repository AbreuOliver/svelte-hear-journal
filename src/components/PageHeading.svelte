<script lang="ts">
  import { Heading, P } from "flowbite-svelte";
  import { readingPlanSelected, weekNumberSelected } from "./store";

  enum ValuesPipe {
    F260_NewTestament = "F260 New Testament",
    F260_WholeBible = "F260 Whole Bible",
  }

  function applyValuesPipe(plan: keyof typeof ValuesPipe): string {
    return ValuesPipe[plan];
  }

  export let headerText;

  let weekNumber;
  weekNumberSelected.subscribe((value) => {
    weekNumber = value;
  });

  let planSelected: string;
  readingPlanSelected.subscribe((value) => {
    planSelected = value;
  });

  console.log("READING PLAN SELECTED:", planSelected);
</script>

<main class="">
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >{headerText}</Heading
  >
  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400">
    {applyValuesPipe("F260_NewTestament")} Plan •
    <span class="text-yellow-400">
      Week {weekNumber}
    </span>
  </P>
</main>
