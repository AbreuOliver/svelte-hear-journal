<script lang="ts">
  import { onMount } from "svelte";
  import { Toast, Button } from "flowbite-svelte";

  let toastMessage: string = "";
  let defaultModal = false;
  let currentTime: string = "";

  function copyToClipboard(event: Event) {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const formattedText = `\`${currentTime}\`  - `;
    navigator.clipboard.writeText(formattedText);
    console.log("Copied:", formattedText);
    defaultModal = true;
    showToast(formattedText);
  }

  function showToast(message: string) {
    toastMessage = message;
  }

  onMount(() => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    currentTime = `${hours}:${minutes}`;
  });
</script>

<main class="flex items-end h-full w-full px-5 pb-5">
  {#if toastMessage !== ""}
    <Toast title="Copied to clipboard:" bind:open={defaultModal} autoclose>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        "{toastMessage}"
      </p>
    </Toast>
  {/if}
  <Button class="w-full" on:click={copyToClipboard}>Copy Current Time</Button>
</main>
