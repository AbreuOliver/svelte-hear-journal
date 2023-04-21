<script>
  import { format } from "timeago.js";
  import Card from "./Card.svelte";
  import { blogs } from "../data";
</script>

<!-- <p class="text-xl dark:text-white">Svelte + Vite + Typescript + TailwindCSS + Flowbite-Svelte + Svelte-Spa-Router</p> -->
{#each blogs as blog}
  <Card
    title={blog.title}
    description={blog.content}
    publishDate={format(blog.publishDate)}
  />
{/each}
