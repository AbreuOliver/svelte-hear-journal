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
  // import PageHeading from "./PageHeading.svelte";

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
    const show = true;
    counter = 6;
    timeout();
  }

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    const show = false;
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
      id: generateUniqueId(),
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

  function generateUniqueId() {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

    return `${year}${month}${day}${hour}${minute}${seconds}${milliseconds}`;
  }
</script>

<form class="w-full px-5 pb-5">
  <Heading
    tag="h2"
    class="my-4 text-left"
    customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl"
    >Journal</Heading
  >

  <hr class=" mb-4 bg-gray-200 border-1 dark:bg-gray-700" />

  <div class="mb-20 text-{$themeColor}-600" style="max-width: 100%;">
    <Heading
      tag="h4"
      class="my-3 text-left text-{$themeColor}-600 dark:text-{$themeColor}-700"
      customSize="text-3xl font-extrabold md:text-4xl lg:text-5xl"
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

    <hr class="my-2 bg-gray-200 border-0 dark:bg-gray-700" />
    {#if warningMessage}
      <Helper class="mb-4 text-lg" color="red">{warningMessage}</Helper>
    {/if}
    {#if showToast}
      <Toast
        color="green"
        position="bottom-right"
        simple
        style="margin-bottom: 5rem;"
      >
        <svelte:fragment slot="icon">
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="sr-only">Check icon</span>
        </svelte:fragment>
        {toastMessage}
      </Toast>
    {/if}
    <Button
      class="min-w-[150px] w-full h-11 mb-2 text-white"
      style="background-color: {$themeColor};"
      on:click={saveToTimeline}
    >
      Save to Timeline
    </Button>
  </div>
</form>
