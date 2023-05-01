<script lang="ts">
  import { Heading, P } from "flowbite-svelte";
  import { readingPlanSelected, weekNumberSelected } from "./store";

  enum ValuesPipe {
    readingPlanNTF260 = "F260 New Testament",
    // Add more enum values and their corresponding mappings here
  }

  function applyValuesPipe(plan: keyof typeof ValuesPipe): string {
    return ValuesPipe[plan];
  }
  const planName = applyValuesPipe("readingPlanNTF260");

  export let headerText;

  let weekNumber;
  weekNumberSelected.subscribe((value) => {
    weekNumber = value;
  });

  let planSelected;
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
  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400"
    >{planName} Plan • <span class="text-blue-600">Week {weekNumber}</span></P
  >
</main>
