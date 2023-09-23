<script lang="ts">
  import {
    Heading,
    P,
    Button,
    Chevron,
    Dropdown,
    Radio,
    DropdownItem,
  } from "flowbite-svelte";
  import { readingPlanSelected, weekNumberSelected, themeColor } from "./store";

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

  {
    $weekNumberSelected;
  }

  let weekSelected = $weekNumberSelected;

  function updateWeekNumber() {
    weekNumberSelected.set(weekSelected);
    console.log("WEEK NUMBER", weekSelected);
  }

  console.log("READING PLAN SELECTED:", planSelected);
</script>

<main>
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >{headerText}</Heading
  >
  <P class="mb-6 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400">
    {applyValuesPipe("F260_NewTestament")} Plan &nbsp;•
    <Button class="pl-1" color="alternative" outline="none"
      ><span
        class={`text-lg lg:text-lg sm:px-0 xl:px-0 text-${$themeColor}-600 dark:text-${$themeColor}-500`}
        >Week #{weekSelected}</span
      >
    </Button>
    <!-- <Dropdown placement="bottom" class="w-auto overflow-y-auto py-1 h-[50vh]">
      <div slot="header" class="px-4 py-2">
        <span class="block text-sm text-gray-900 dark:text-white">
          Select your current week
        </span>
      </div>
      {#each Array.from({ length: 52 }, (_, i) => i + 1) as week}
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
    </Dropdown> -->
    <Dropdown placement="bottom" class="w-auto overflow-y-auto py-1 h-[50vh]">
      <div slot="header" class="px-4 py-2">
        <span class="block text-sm text-gray-900 dark:text-white">
          Select your current week
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
