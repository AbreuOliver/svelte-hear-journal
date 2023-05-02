<script lang="ts">
  import { onMount } from "svelte";
  import {
    Card,
    Button,
    Dropdown,
    DropdownItem,
    Chevron,
    Radio,
    Label,
    Helper,
  } from "flowbite-svelte";
  import {
    readingPlanSelected,
    weekNumberSelected,
    selectedFontSyleForBibleText,
  } from "./store";
  import PageHeading from "./PageHeading.svelte";

  enum ValuesPipe {
    F260_NewTestament = "F260 New Testament",
    F260_WholeBible = "F260 Whole Bible",
  }

  function applyValuesPipe(plan: keyof typeof ValuesPipe): string {
    return ValuesPipe[plan];
  }

  {
    $weekNumberSelected;
  }
  {
    $readingPlanSelected;
  }

  let planSelected = $readingPlanSelected;
  let weekSelected = $weekNumberSelected;

  function updateWeekNumber() {
    weekNumberSelected.set(weekSelected);
    console.log("WEEK NUMBER", weekSelected);
  }

  function updateReadingPlan() {
    readingPlanSelected.set(planSelected);
  }

  console.log("WEEK NUMBER", weekSelected);
</script>

<main class="w-full px-5 pb-[10rem]">
  <PageHeading headerText="User Settings" />

  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
  <Card class="w-full my-0">
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Bible Reading Plan
    </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      The corresponding memory verses and reading plan will be displayed for
      your selected week number
    </p>
    <Button><Chevron>Selected Plan: {planSelected}</Chevron></Button>
    <Dropdown placement="bottom" class="w-auto overflow-y-auto py-1 h-48">
      <div slot="header" class="px-4 py-2">
        <span class="block text-sm text-gray-900 dark:text-white"
          >Select the week of the year</span
        >
      </div>
      <!-- <DropdownItem class="flex items-center text-base font-semibold gap-2">
        <Radio
          name="BibleReadingPlanOptions"
          bind:group={planSelected}
          value={ValuesPipe.F260_NewTestament}
          on:change={updateReadingPlan}
        >
          {applyValuesPipe("F260_NewTestament")}
        </Radio>
      </DropdownItem>
      <DropdownItem class="flex items-center text-base font-semibold gap-2">
        <Radio
          name="BibleReadingPlanOptions"
          bind:group={planSelected}
          value={ValuesPipe.F260_WholeBible}
          on:change={updateReadingPlan}
        >
          {applyValuesPipe("F260_WholeBible")}
        </Radio>
      </DropdownItem> -->
    </Dropdown>
  </Card>
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
  <Card>
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Week Number
    </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      The corresponding memory verses and reading plan will be displayed for
      your selected week number
    </p>
    <Button><Chevron>Selected Week #{weekSelected}</Chevron></Button>
    <Dropdown placement="top" class="w-auto overflow-y-auto py-1 h-48">
      <div slot="header" class="px-4 py-2">
        <span class="block text-sm text-gray-900 dark:text-white"
          >Select the week of the year</span
        >
      </div>
      {#each Array.from({ length: 50 }, (_, i) => i + 1) as week}
        <DropdownItem class="flex items-center text-base font-semibold gap-2">
          <Radio
            name="group1"
            bind:group={weekSelected}
            value={week}
            on:change={updateWeekNumber}>Week {week}</Radio
          >
        </DropdownItem>
      {/each}
    </Dropdown>
  </Card>
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
  <Card>
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Bible Text Font Family
    </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      The corresponding memory verses and reading plan will be displayed for
      your selected week number
    </p>
    <Button><Chevron>Selected Week #{weekSelected}</Chevron></Button>
    <Dropdown placement="top" class="w-auto overflow-y-auto py-1 h-48">
      <div slot="header" class="px-4 py-2">
        <span class="block text-sm text-gray-900 dark:text-white"
          >Select the week of the year</span
        >
      </div>
      {#each Array.from({ length: 50 }, (_, i) => i + 1) as week}
        <DropdownItem class="flex items-center text-base font-semibold gap-2">
          <Radio
            name="group1"
            bind:group={weekSelected}
            value={week}
            on:change={updateWeekNumber}>Week {week}</Radio
          >
        </DropdownItem>
      {/each}
    </Dropdown>
  </Card>
</main>
