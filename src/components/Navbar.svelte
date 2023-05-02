<script lang="ts">
  import { Navbar, NavBrand, DarkMode } from "flowbite-svelte";

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
  class="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-100 w-full flex items-center justify-center border-b z-20 sticky top-0 left-0"
>
  <Navbar
    navClass="flex items-center w-full max-w-[700px] px-2 sm:px-4 py-2.5"
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
      <DarkMode
        class="item-center justify-center grow-1 border-1 border-inherit"
      />
    </div>
  </Navbar>
</nav>
