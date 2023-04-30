// @ts-ignore
import MemoryVerse from "./components/Home.svelte";
// @ts-ignore
import ReadingPlan from "./components/ReadingPlan.svelte";
// @ts-ignore
import Journal from "./components/About.svelte";
// @ts-ignore
import Settings from "./components/Article.svelte";
// @ts-ignore
// import NotFound from "./components/NotFound.svelte";

export default {
  // Exact path
  // "*": NotFound,
  "/memory-verse": MemoryVerse,
  "/reading-plan": ReadingPlan,
  "/journal": Journal,
  "/settings": Settings,
};
