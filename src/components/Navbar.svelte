<script lang="ts">
  import {
    Navbar,
    NavBrand,
    DarkMode,
    Drawer,
    Button,
    CloseButton,
    Sidebar,
    SidebarBrand,
    SidebarCta,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    Card,
    Dropdown,
    DropdownItem,
    Chevron,
    Radio,
    Heading,
    Listgroup,
  } from "flowbite-svelte";
  import { sineIn } from "svelte/easing";
  // import { onMount } from "svelte";
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
  let drawer = true;
  let backdrop = false;
  let spanClass = "flex-1 ml-3 whitespace-nowrap";
  let transitionParamsTop = {
    y: -320,
    duration: 200,
    easing: sineIn,
  };

  let logo: string;

  const lightLogo: string = `https://ik.imagekit.io/bip1v395ybp/HEARLogoLight_P6zpi-UUGo.svg`;
  const darkLogo: string = `https://ik.imagekit.io/bip1v395ybp/HEARLogoDark_kyGH1ZREL.svg`;

  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    console.log("DARK MODE ON");
    logo = darkLogo;
  } else {
    console.log("DARK MODE OFF");
    logo = lightLogo;
  }
</script>

<nav
  class="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-100 w-full flex items-center justify-center border-b z-20 sticky top-0 left-0 md:h-[5rem]"
>
  <Navbar
    navClass="flex items-center w-full max-w-[700px] px-4 py-2.5"
    let:hidden
    let:toggle
  >
    <div class="flex items-center justify-center w-full">
      <NavBrand style="display: flex; flex-grow: 1;" href="/">
        <img src={logo} class="mx-2 h-7 sm:h-9" alt="HEAR Journal Logo" />
        <span
          class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          >Journal</span
        >
      </NavBrand>
      <div class="flex text-center">
        <DarkMode
          class="item-center justify-center grow-1 border-1 border-inherit"
        />
        <Button
          color="alternative"
          outline="false"
          on:click={() => (drawer = false)}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </Button>
      </div>
      <Drawer
        transitionType="fly"
        transitionParams={transitionParamsTop}
        placement="top"
        width="w-full"
        bind:hidden={drawer}
        id="drawer"
        class="w-full flex items-center justify-center pt-1 overflow-x-hidden"
      >
        <div
          class="flex flex-col items-start w-full max-w-[700px] px-2 sm:px-4 py-2.5"
        >
          <div class="flex w-full items-center border-gray-100">
            <h5
              id="drawer-navigation-label-3"
              class="ml-5 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
            >
              Menu
            </h5>
            <CloseButton
              on:click={() => (drawer = true)}
              class="dark:text-white w-[50px] mr-0.5 text-center focus:ring-4 focus:outline-none inline-flex items-center justify-center py-2.5 dark:bg-transparent dark:border-gray-800 dark:hover:border-gray-700 rounded-lg"
            />
          </div>
          <!-- <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" /> -->
          <hr
            class="h-px my-2 bg-gray-200 dark:bg-gray-700 w-[150vw] flex justify-center items-center ml-[-5rem]"
          />
          <Sidebar class="w-full max-h-full">
            <SidebarWrapper
              divClass="overflow-y-scroll py-4 rounded dark:bg-gray-800"
            >
              <SidebarGroup>
                <!-- <SidebarItem label="Sign In">
                  <svelte:fragment slot="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      /></svg
                    >
                  </svelte:fragment>
                </SidebarItem> -->
                <main class="w-full pb-[10rem]">
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
                        ><Chevron
                          >{applyValuesPipe("F260_NewTestament")}</Chevron
                        ></Button
                      >
                      <Dropdown
                        placement="bottom"
                        class="w-auto overflow-y-auto py-1 min-h-full max-h-48"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
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
                        <DropdownItem
                          class="flex items-center text-base font-semibold gap-2"
                        >
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
                    <hr
                      class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"
                    />
                    <div class="flex justify-end items-center my-1.5 border-0">
                      <p
                        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
                      >
                        Week Number
                      </p>
                      <Button class="grow-1"
                        ><Chevron>Week #{weekSelected}</Chevron></Button
                      >
                      <Dropdown
                        placement="left"
                        class="w-auto overflow-y-auto py-1 h-48"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
                            >Select the week of the year</span
                          >
                        </div>
                        {#each Array.from({ length: 50 }, (_, i) => i + 1) as week}
                          <DropdownItem
                            class="flex items-center text-base font-semibold gap-2"
                          >
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
                      <Button class="grow-1"
                        ><Chevron>Dark Icon</Chevron></Button
                      >
                      <Dropdown
                        placement="bottom"
                        class="w-auto overflow-y-auto py-1 min-h-full max-h-48"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
                            >Select the week of the year</span
                          >
                        </div>
                        <DropdownItem
                          class="flex items-center text-base font-semibold gap-2"
                        >
                          <Radio
                            name="BibleReadingPlanOptions"
                            bind:group={planSelected}
                            value={ValuesPipe.F260_NewTestament}
                            on:change={updateReadingPlan}
                          >
                            {applyValuesPipe("F260_NewTestament")}
                          </Radio>
                        </DropdownItem>
                        <DropdownItem
                          class="flex items-center text-base font-semibold gap-2"
                        >
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
                    <hr
                      class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"
                    />
                    <div class="flex justify-end items-center my-1.5 border-0">
                      <p
                        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
                      >
                        Accent Color
                      </p>
                      <Button class="grow-1"
                        ><Chevron>Tech Blue</Chevron></Button
                      >
                      <Dropdown
                        placement="left"
                        class="w-auto overflow-y-auto py-1 h-48"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
                            >Select the week of the year</span
                          >
                        </div>
                        {#each Array.from({ length: 50 }, (_, i) => i + 1) as week}
                          <DropdownItem
                            class="flex items-center text-base font-semibold gap-2"
                          >
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
                    <hr
                      class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"
                    />
                    <div class="flex justify-end items-center my-1.5 border-0">
                      <p
                        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
                      >
                        Bible Text Font
                      </p>
                      <Button class="grow-1"
                        ><Chevron>Sans Serif</Chevron></Button
                      >
                      <Dropdown
                        placement="left"
                        class="w-auto overflow-y-auto py-1 h-48"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
                            >Select the week of the year</span
                          >
                        </div>
                        {#each Array.from({ length: 50 }, (_, i) => i + 1) as week}
                          <DropdownItem
                            class="flex items-center text-base font-semibold gap-2"
                          >
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
                    <hr
                      class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"
                    />
                    <div class="flex justify-end items-center my-1.5 border-0">
                      <p
                        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
                      >
                        Bible Translation
                      </p>
                      <Button class="grow-1"><Chevron>KJV</Chevron></Button>
                      <Dropdown
                        placement="left"
                        class="w-auto overflow-y-auto py-1 h-48"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
                            >Select the week of the year</span
                          >
                        </div>
                        {#each Array.from({ length: 50 }, (_, i) => i + 1) as week}
                          <DropdownItem
                            class="flex items-center text-base font-semibold gap-2"
                          >
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
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
        </div>
      </Drawer>
      <!-- <DarkMode
        class="item-center justify-center grow-1 border-1 border-inherit"
      /> -->
    </div>
  </Navbar>
</nav>
