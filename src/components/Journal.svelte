<script lang="ts">
  import {
    Card,
    Dropdown,
    DropdownItem,
    Radio,
    Hr,
    P,
    Heading,
    Label,
    Input,
    Helper,
    Textarea,
    Button,
    Toast,
  } from "flowbite-svelte";
  import { readingPlanSelected, weekNumberSelected, themeColor } from "./store";
  import PageHeading from "./PageHeading.svelte";

  let showToast = false;
  let toastMessage = "Journal entry saved 🎉";
  let counter = 6;

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
  }

  function trigger() {
    show = true;
    counter = 6;
    timeout();
  }

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    show = false;
  }

  let explanation = {
    id: "explanation",
    name: "message",
    label: "Your message",
    rows: 4,
    placeholder: "Those that endure difficulty will be rewarded by God",
  };
  let application = {
    id: "application",
    name: "message",
    label: "Your message",
    rows: 4,
    placeholder:
      "I should see my difficulties as opportunities for eternal reward",
  };
  let response = {
    id: "response",
    name: "message",
    label: "Your message",
    rows: 5,
    placeholder:
      "Thank you for allowing my difficulties as a Christian to be meaningful now and in eternity. Help me to endure hardships as a good soldier of Jesus Christ, so that You are glorified",
  };

  function getCurrentDate() {
    const date = new Date();
    return date.toLocaleDateString();
  }
  let timeline = [];

  let warningMessage = "";

  function saveToTimeline() {
    const verseInput = document.getElementById(
      "default-input"
    ) as HTMLTextAreaElement;
    const explanationInput = document.getElementById(
      "explanation"
    ) as HTMLTextAreaElement;
    const applicationInput = document.getElementById(
      "application"
    ) as HTMLTextAreaElement;
    const responseInput = document.getElementById(
      "response"
    ) as HTMLTextAreaElement;

    // Validate fields
    if (
      !verseInput.value ||
      !explanationInput.value ||
      !applicationInput.value ||
      !responseInput.value
    ) {
      warningMessage = "Please fill in all fields.";
      return;
    }

    // Create a new object with the inputs and the current date
    const entry = {
      date: getCurrentDate(),
      verse: verseInput.value,
      explanation: explanationInput.value,
      application: applicationInput.value,
      response: responseInput.value,
    };

    // Retrieve existing timeline data from local storage
    const existingData = localStorage.getItem("timeline");

    // Parse existing data if it exists, or initialize as an empty array
    const timeline = existingData ? JSON.parse(existingData) : [];

    // Push the new entry to the timeline array
    timeline.push(entry);

    showToast = true;

    // Clear input fields
    verseInput.value = "";
    explanationInput.value = "";
    applicationInput.value = "";
    responseInput.value = "";

    // Clear warning message
    warningMessage = "";

    // Save the updated timeline to local storage
    localStorage.setItem("timeline", JSON.stringify(timeline));
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      saveToTimeline();
    }
  }
</script>

<form class="w-full px-5 pb-5">
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >Journal</Heading
  >
  <div class="flex justify-start items-center">
    <P class="mb-0 text-lg lg:text-xl sm:px-0 xl:px-0 dark:text-gray-400">
      Thoughts for:
    </P>

    <Button class="pl-2 ml-0" color="alternative" outline="none"
      ><span
        class={`text-lg lg:text-lg sm:px-0 xl:px-0 text-${$themeColor}-600`}
        >Week #{weekSelected}</span
      >
    </Button>
    <Dropdown placement="bottom" class="w-auto overflow-y-auto py-1 h-48">
      <div slot="header" class="px-4 py-2">
        <span class="block text-sm text-gray-900 dark:text-white"
          >Select the week of the year. <br />Tap the blue text again to close</span
        >
      </div>
      {#each Array.from({ length: 52 }, (_, i) => i + 1) as week}
        <DropdownItem class="flex items-center text-base font-semibold gap-2">
          <span class="w-full p-[.125rem]">Week {week}</span><Radio
            class="p-4"
            name="group1"
            bind:group={weekSelected}
            value={week}
            on:change={updateWeekNumber}
          />
        </DropdownItem>
      {/each}
    </Dropdown>
  </div>
  <hr class=" mb-4 bg-gray-200 border-0 dark:bg-gray-700" />

  <Card class="mb-20" style="max-width: 100%;">
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Highlight</Heading
    >
    <div class="mb-2">
      <Label for="default-input" class="block mb-2"
        >Which verse stood out to me?</Label
      >
      <Textarea
        id="default-input"
        rows="1"
        placeholder="James 1:12"
        onkeydown={handleKeyDown}
      />
    </div>
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Explain</Heading
    >
    <div class="mb-2">
      <Label for="default-input" class="block mb-2"
        >What does this verse teach me?</Label
      >
      <Textarea {...explanation} id="explanation" onkeydown={handleKeyDown} />
    </div>
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Apply</Heading
    >
    <div class="mb-2">
      <Label for="default-input" class="block mb-2"
        >What should I believe/do as a result of the truth of this verse?</Label
      >
      <Textarea {...application} id="application" onkeydown={handleKeyDown} />
    </div>
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Respond</Heading
    >
    <div class="mb-2">
      <Label for="default-input" class="block mb-2">Dear Heavenly Father,</Label
      >
      <Textarea {...response} id="response" onkeydown={handleKeyDown} />
    </div>
    <hr class="my-2 bg-gray-200 border-0 dark:bg-gray-700" />
    {#if warningMessage}
      <Helper class="mb-4 text-lg" color="red">{warningMessage}</Helper>
    {/if}
    {#if showToast}
      <Toast color="green" simple>
        <svelte:fragment slot="icon">
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            /></svg
          >
          <span class="sr-only">Check icon</span>
        </svelte:fragment>
        {toastMessage}
      </Toast>
    {/if}
    <Button class="min-w-[150px] mb-2" on:click={saveToTimeline}
      >Save to Timeline</Button
    >
  </Card>
</form>
