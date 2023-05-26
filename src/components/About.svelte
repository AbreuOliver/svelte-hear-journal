<script lang="ts">
  //@ts-ignore
  import { Hr, Card, Button } from "flowbite-svelte";
</script>

<main class="min-h-[75vh] w-full p-5 flex justify-center items-start" id="main">
  <Card
    img="https://ik.imagekit.io/bip1v395ybp/gray-waves_vUdoArLvW.png"
    class="w-full h-full"
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Welcome!
    </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      <Hr class="my-2" height="h-0" />
      This tool is designed for users of the
      <a
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="https://replicate.org/what-is-a-hear-journal/"
        >HEAR Bible journaling method</a
      >
      and
      <a
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="https://replicate.org/resourcing-disciple-makers/family-reading-plans/"
        >Foundations Bible reading plans</a
      >. With this app, you can easily access the memory verses and reading
      plans that correspond to your chosen plan. <br />
      <Hr class="my-2" height="h-0" />
      Get started today and simplify your Bible study routine 🙂
    </p>
    <Hr class="my-6" height="h-0" />
    <Button class="min-w-full" href="#/reading-plan">View Reading Plan</Button>
  </Card>
</main>
