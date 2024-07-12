<script lang="ts">
  import {
    Heading,
    P,
    Button,
    Chevron,
    Dropdown,
    DropdownDivider,
    DropdownItem,
  } from "flowbite-svelte";
  import { readingPlanSelected, weekNumberSelected, themeColor } from "./store";
  import * as readingPlanJSON from "../../readingPlans.json";
  import ReadingPlan from "./ReadingPlan.svelte";

  enum ValuesPipe {
    F260_NewTestament = "New Testament",
    F260_WholeBible = "Whole Bible",
    F260_OldTestament = "Old Testament",
  }

  function applyValuesPipe(plan: keyof typeof ValuesPipe): string {
    return ValuesPipe[plan];
  }

  export let headerText;

  let weekNumber;
  weekNumberSelected.subscribe((value) => {
    weekNumber = value;
  });

  let weekSelected = $weekNumberSelected;

  function updateWeekNumber() {
    weekNumberSelected.set(weekSelected);
    console.log("*** User selected week number: ", weekSelected);
  }

  enum ReadingPlans {
    F260_NewTestament = "F260_NewTestament",
    F260_WholeBible = "F260_WholeBible",
    F260_OldTestament = "F260_OldTestament",
  }

  let planSelected;
  readingPlanSelected.subscribe((value) => {
    planSelected = value;
  });

  function updateReadingPlan() {
    readingPlanSelected.set(planSelected);
    console.log("--->> User selected reading plan: ", planSelected);
  }

  console.log(
    "Object keys",
    Object.keys(readingPlanJSON).filter((key) => key !== "default")
  );
</script>

<main>
  <Heading
    tag="h2"
    class="mb-4 mt-[5%] text-left"
    customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl"
    style="color: #333;"
    >{headerText}
  </Heading>

  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400">
    <Button
      color="alternative"
      class="p-1"
      activeClass={`text-${$themeColor}-600 dark:text-${$themeColor}-500`}
    >
      <span class={`text-md lg:text-lg sm:px-0 xl:px-0`}>
        {applyValuesPipe($readingPlanSelected)}
      </span>
      <Chevron />
    </Button>

    <Dropdown placement="bottom" class="relative inline-block">
      <div slot="header" class="px-4 py-2">
        <span
          class={`block text-sm text-gray-900 font-bold dark:text-white text-${$themeColor}-600 dark:text-${$themeColor}-500`}
        >
          Select plan:
        </span>
      </div>

      {#each Object.keys(readingPlanJSON).filter((key) => key !== "default") as plan}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <DropdownItem
          class="cursor-pointer px-4 py-2 hover:bg-gray-100"
          on:click={() => {
            readingPlanSelected.set(plan);
            updateReadingPlan();
          }}
        >
          {applyValuesPipe(plan)}
        </DropdownItem>
        <DropdownDivider />
      {/each}
    </Dropdown>
    <!-- &nbsp;• -->
    <Button class="p-2" color="alternative"
      ><span
        class={`text-md lg:text-lg sm:px-0 xl:px-0 text-${$themeColor}-600 dark:text-${$themeColor}-500`}
        >Week #{weekSelected}</span
      >
      <Chevron />
    </Button>
    <Dropdown placement="bottom" class="w-auto overflow-y-auto py-1 h-[50vh]">
      <div slot="header" class="px-4 py-2">
        <span class="block text-sm text-gray-900 dark:text-white">
          Select week:
        </span>
      </div>
      {#each Array.from({ length: 52 }, (_, i) => ((i + weekNumber) % 52) + 1) as week}
        <DropdownItem
          class="flex w-full items-center text-base font-semibold gap-4 text-center {weekSelected ===
          week
            ? `bg-${$themeColor}-100 text-${$themeColor}-600`
            : ''}"
          on:click={() => {
            weekSelected = week;
            updateWeekNumber();
          }}
        >
          <span class="grow-[1]">Week {week}</span>
        </DropdownItem>
      {/each}
    </Dropdown>
  </P>
</main>
