<script lang="ts">
  import { Heading, Label, Input, Textarea } from "flowbite-svelte";
  import PageHeading from "./PageHeading.svelte";
  let textareaprops = {
    id: "message",
    name: "message",
    label: "Your message",
    rows: 4,
    placeholder: "Those that endure difficulty will be rewarded by God...",
  };
</script>

<main class="w-full px-5 pb-5">
  <PageHeading headerText="Journal" />
  <hr class="my-6 bg-gray-200 border-0 dark:bg-gray-700" />
  <Heading
    tag="h4"
    class="my-4 text-left"
    customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
    >Highlight</Heading
  >
  <div class="mb-6">
    <Label for="default-input" class="block mb-2"
      >Which verse stood out to you?</Label
    >
    <Input id="default-input" placeholder="James 1:12" />
  </div>
  <hr class="my-4 bg-gray-200 border-0 dark:bg-gray-700" />
  <Heading
    tag="h4"
    class="my-4 text-left"
    customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
    >Explain</Heading
  >
  <div class="mb-6">
    <Label for="default-input" class="block mb-2"
      >What does that verse teach, in your words?</Label
    >
    <Textarea {...textareaprops} />
  </div>
  <hr class="my-4 bg-gray-200 border-0 dark:bg-gray-700" />
  <Heading
    tag="h4"
    class="my-4 text-left"
    customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl">Apply</Heading
  >
  <div class="mb-6">
    <Label for="default-input" class="block mb-2"
      >How can you apply the truth of that verse?</Label
    >
    <Textarea {...textareaprops} />
  </div>
  <hr class="my-6 bg-gray-200 border-0 dark:bg-gray-700" />
</main>
