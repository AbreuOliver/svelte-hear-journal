<script lang="ts">
  import {
    Card,
    Heading,
    Label,
    Input,
    Textarea,
    Button,
  } from "flowbite-svelte";
  import PageHeading from "./PageHeading.svelte";
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
</script>

<form class="w-full px-5 pb-5">
  <PageHeading headerText="My Journal" />
  <Card class="mb-20" style="max-width: 100%;">
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Highlight</Heading
    >
    <div class="mb-">
      <Label for="default-input" class="block mb-2"
        >Which verse stood out to me?</Label
      >
      <Textarea id="default-input" rows="1" placeholder="James 1:12" />
    </div>
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Explain</Heading
    >
    <div class="mb-">
      <Label for="default-input" class="block mb-2"
        >What does this verse teach me?</Label
      >
      <Textarea {...explanation} />
    </div>
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Apply</Heading
    >
    <div class="mb-">
      <Label for="default-input" class="block mb-2"
        >What should I believe/do as a result of the truth of this verse?</Label
      >
      <Textarea {...application} />
    </div>
    <Heading
      tag="h4"
      class="my-3 text-left"
      customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl"
      >Respond</Heading
    >
    <div class="mb-">
      <Label for="default-input" class="block mb-2">Dear Heavenly Father,</Label
      >
      <Textarea {...response} />
    </div>
    <hr class="my-2 bg-gray-200 border-0 dark:bg-gray-700" />
    <Button class="min-w-[150px] mb-2">Save</Button>
  </Card>

  <hr class="my-6 bg-gray-200 border-0 dark:bg-gray-700" />
</form>
