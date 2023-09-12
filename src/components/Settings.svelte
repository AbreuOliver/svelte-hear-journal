<script lang="ts">
  import { onMount } from "svelte";
  import {
    Card,
    Button,
    Dropdown,
    DropdownItem,
    Chevron,
    Radio,
    Heading,
    Listgroup,
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

<main class="w-full px-5 pb-[10rem]" style="z-index: 999;">
  <!-- <Heading
    tag="h2"
    class="mt-4 text-left mb-6"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >Settings</Heading
  > -->
  <PageHeading headerText="Settings" />

  <!-- <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" /> -->
  <h5
    class="mt-2 mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
  >
    Content
  </h5>
  <Card
    class="max-w-full min-w-full shadow-none my-0 horizontal bg-gray-200 dark:bg-gray-700"
  >
    <!-- ///////////////////////// -->
    <div class="flex justify-end items-center my-1.5 border-0">
      <p
        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
      >
        Reading Plan
      </p>
      <Button class="grow-1"
        ><Chevron>{applyValuesPipe("F260_NewTestament")}</Chevron></Button
      >
      <Dropdown
        placement="bottom"
        class="w-auto overflow-y-auto py-1 min-h-full max-h-48"
      >
        <div slot="header" class="px-4 py-2">
          <span class="block text-sm text-gray-900 dark:text-white"
            >Select the week of the year</span
          >
        </div>
        <DropdownItem
          class="flex border-gray-200 border-1 items-center text-base font-semibold gap-2"
        >
          <Radio
            class=""
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
            class="disabled"
          >
            {applyValuesPipe("F260_WholeBible")}
          </Radio>
        </DropdownItem>
      </Dropdown>
    </div>
    <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
    <div class="flex justify-end items-center my-1.5 border-0">
      <p
        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
      >
        Week Number
      </p>
      <Button class="grow-1"><Chevron>Week #{weekSelected}</Chevron></Button>
      <Dropdown placement="left" class="w-auto overflow-y-auto py-1 h-48">
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
    </div>
  </Card>
  <hr class=" mb-8 bg-gray-200 border-0 dark:bg-gray-700" />

  <!-- <Card>
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
    <Dropdown placement="left" class="w-auto overflow-y-auto py-1 h-48">
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
  </Card> -->
  <h5
    class="mt-2 mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
  >
    Styling
  </h5>
  <Card
    class="max-w-full min-w-full shadow-none my-0 horizontal bg-gray-200 dark:bg-gray-700"
  >
    <!-- ///////////////////////// -->
    <div class="flex justify-end items-center my-1.5 border-0">
      <p
        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
      >
        Logo
      </p>
      <Button class="grow-1"><Chevron>Dark Icon</Chevron></Button>
      <Dropdown
        placement="bottom"
        class="w-auto overflow-y-auto py-1 min-h-full max-h-48"
      >
        <div slot="header" class="px-4 py-2">
          <span class="block text-sm text-gray-900 dark:text-white"
            >Select the week of the year</span
          >
        </div>
        <DropdownItem class="flex items-center text-base font-semibold gap-2">
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
            class="disabled"
          >
            {applyValuesPipe("F260_WholeBible")}
          </Radio>
        </DropdownItem>
      </Dropdown>
    </div>
    <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
    <div class="flex justify-end items-center my-1.5 border-0">
      <p
        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
      >
        Accent Color
      </p>
      <Button class="grow-1"><Chevron>Tech Blue</Chevron></Button>
      <Dropdown placement="left" class="w-auto overflow-y-auto py-1 h-48">
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
    </div>
    <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
    <div class="flex justify-end items-center my-1.5 border-0">
      <p
        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
      >
        Bible Text Font
      </p>
      <Button class="grow-1"><Chevron>Sans Serif</Chevron></Button>
      <Dropdown placement="left" class="w-auto overflow-y-auto py-1 h-48">
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
    </div>
    <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
    <div class="flex justify-end items-center my-1.5 border-0">
      <p
        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
      >
        Bible Translation
      </p>
      <Button class="grow-1"><Chevron>KJV</Chevron></Button>
      <Dropdown placement="left" class="w-auto overflow-y-auto py-1 h-48">
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
    </div>
  </Card>
</main>
