// @ts-ignore
import About from "./components/About.svelte";
// @ts-ignore
import MemoryVerse from "./components/MemoryVerses.svelte";
// @ts-ignore
import ReadingPlan from "./components/ReadingPlan.svelte";
import Copy from "./components/Copy.svelte";
import Audio from "./components/Audio.svelte";

export default {
  // Exact path
  // "*": NotFound,
  "/": About,
  "/memory-verse": MemoryVerse,
  "/reading-plan": ReadingPlan,
  "/copy": Copy,
  "/audio": Audio
};
