<script lang="ts">
  import Router, { location } from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import Banner from "./components/Banner.svelte";

  let currentdate: Date = new Date();
let oneJan: Date = new Date(currentdate.getFullYear(), 0, 1);
let numberOfDays: number = Math.floor((currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
let currentWeekNumberOfTheYear: number = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
let dayOfWeekName: string = new Date().toLocaleString("default", { weekday: "long" });

console.log("Day of Week Name:", dayOfWeekName);

let readingStatus: string = "";

if (dayOfWeekName === "Friday") {
    readingStatus = "Meeting to discuss reading ";
} else if (dayOfWeekName === "Saturday") {
    readingStatus = "Started reading ";
} else {
    readingStatus = "Currently reading ";
}

let currentReadingWeek: number | string = "";

if (dayOfWeekName === "Saturday" || dayOfWeekName === "Sunday") {
    currentReadingWeek = currentWeekNumberOfTheYear;
} else {
    currentReadingWeek = currentWeekNumberOfTheYear - 1;
}

console.log("Week Number:", `${currentReadingWeek}`);

</script>

<div class="w-full h-full">
  <div class="relative flex flex-col items-center w-full h-full">
    <Navbar />

    <div
      class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-[90vh] max-w-full"
    >
      <main
        class="flex flex-col items-center w-full overflow-scroll bg-gray-50 dark:bg-gray-900 min-h-full max-w-[700px]"
      >
        <br />
        <Banner />
        <Router {routes} />
      </main>
      <!-- {#if $location !== "/"} -->
        <Footer />
      <!-- {/if} -->
    </div>
  </div>
</div>
