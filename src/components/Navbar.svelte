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
  import {
    readingPlanSelected,
    weekNumberSelected,
    selectedFontSyleForBibleText,
    themeColor,
  } from "./store";
  // import PageHeading from "./PageHeading.svelte";

  const themeColors = [
    "red",
    // "orange",
    // "amber",
    "yellow",
    // "lime",
    "green",
    // "emerald",
    "teal",
    // "cyan",
    "blue",
    // "indigo",
    // "violet",
    "purple",
    // "fuchsia",
    "pink",
    // "rose",
  ];

  console.log("Theme Color: ", $themeColor);

  enum ValuesPipe {
    F260_NewTestament = "F260 New Testament",
    F260_WholeBible = "F260 Whole Bible",
  }

  function applyValuesPipe(plan: keyof typeof ValuesPipe): string {
    return ValuesPipe[plan];
  }

  {
    $weekNumberSelected;
    $readingPlanSelected;
    $themeColor;
  }

  let weekSelected = $weekNumberSelected;
  let themeColorSelected = $themeColor;

  function updateThemeColor() {
    themeColor.set(themeColorSelected);
    console.log("THEME COLOR", themeColorSelected);
  }

  function updateWeekNumber() {
    weekNumberSelected.set(weekSelected);
    console.log("WEEK NUMBER", weekSelected);
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

  let logoSelected = localStorage.getItem("logo-theme") || "dark"; // Default value

  $: {
    if (logoSelected === "dark") {
      logo = darkLogo;
    } else {
      logo = lightLogo;
    }
  }

  function updateLogoTheme() {
    localStorage.setItem("logo-theme", logoSelected);
  }
</script>

<nav
  class="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray0100 dark:border-gray-800 w-full flex items-center justify-center border-b z-100 sticky top-0 left-0 md:h-[5rem]"
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
            <NavBrand style="display: flex; flex-grow: 1;" href="/">
              <img src={logo} class="mx-2 h-7 sm:h-9" alt="HEAR Journal Logo" />
              <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                >Menu</span
              >
            </NavBrand>
            <CloseButton
              on:click={() => (drawer = true)}
              class="dark:text-white w-[50px] mr-0.5 text-center focus:ring-4 focus:outline-none inline-flex items-center justify-center py-2.5 dark:bg-transparent dark:border-gray-800 dark:hover:border-gray-700 rounded-lg"
            />
          </div>
          <hr
            class="h-px my-2 bg-gray-200 dark:bg-gray-700 w-[150vw] flex justify-center items-center ml-[-5rem]"
          />
          <Sidebar class="w-full max-h-full">
            <SidebarWrapper
              divClass="overflow-y-scroll py-4 rounded dark:bg-gray-800"
            >
              <SidebarGroup>
                <main class="w-full pb-[10rem]">
                  <Heading
                    tag="h2"
                    class={`my-4 text-left text-${$themeColor}-600 dark:text-${$themeColor}-500`}
                    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
                    >Settings</Heading
                  >
                  <hr class=" mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
                  <Card
                    class="max-w-full min-w-full shadow-none my-0 horizontal bg-gray-200 dark:bg-gray-700"
                  >
                    <!--// SELECT LOGO // -->
                    <div class="flex justify-end items-center my-1.5 border-0">
                      <p
                        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
                      >
                        Logo
                      </p>
                      <Button class="grow-1" color="alternative"
                        ><Chevron
                          >{logoSelected === "dark" ? "Light" : "Dark"} Logo</Chevron
                        ></Button
                      >
                      <Dropdown
                        placement="bottom"
                        class="w-auto overflow-y-auto py-1 min-h-full max-h-48"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
                            >Select the logo theme</span
                          >
                        </div>
                        <DropdownItem
                          class="flex items-center text-base font-semibold gap-2"
                        >
                          <Radio
                            name="logoThemeOptions"
                            bind:group={logoSelected}
                            value="dark"
                            on:change={updateLogoTheme}>Light Logo</Radio
                          >
                        </DropdownItem>
                        <DropdownItem
                          class="flex items-center text-base font-semibold gap-2"
                        >
                          <Radio
                            name="logoThemeOptions"
                            bind:group={logoSelected}
                            value="light"
                            on:change={updateLogoTheme}>Dark Logo</Radio
                          >
                        </DropdownItem>
                      </Dropdown>
                    </div>
                    <hr
                      class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"
                    />
                    <!--// SELECT ACCENT COLOR // -->
                    <div class="flex justify-end items-center my-1.5 border-0">
                      <p
                        class="my-0 font-normal text-gray-700 dark:text-gray-400 leading-tight grow grow-2"
                      >
                        Accent Color
                      </p>
                      <Button class="grow-1" color="alternative">
                        <Chevron
                          >{`${$themeColor
                            .charAt(0)
                            .toUpperCase()}${$themeColor.slice(1)}`}</Chevron
                        >
                      </Button>
                      <Dropdown
                        placement="left"
                        class="w-auto overflow-y-auto py-1 h-60"
                      >
                        <div slot="header" class="px-4 py-2">
                          <span
                            class="block text-sm text-gray-900 dark:text-white"
                            >Select the accent color</span
                          >
                        </div>
                        {#each themeColors as color}
                          <DropdownItem
                            class="flex items-center text-base font-semibold gap-2"
                          >
                            <Radio
                              name="themeColorOptions"
                              bind:group={themeColorSelected}
                              value={color}
                              on:change={updateThemeColor}
                              >{`${color.charAt(0).toUpperCase()}${color.slice(
                                1
                              )}`}</Radio
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
                      <Button class="grow-1" color="alternative" disabled="true"
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
                      <Button class="grow-1" color="alternative" disabled
                        ><Chevron>KJV</Chevron></Button
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
                </main>
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
        </div>
      </Drawer>
    </div>
  </Navbar>
</nav>
