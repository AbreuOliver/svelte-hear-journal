// @ts-ignore
import About from "./components/About.svelte";
// @ts-ignore
import MemoryVerse from "./components/MemoryVerses.svelte";
// @ts-ignore
import ReadingPlan from "./components/ReadingPlan.svelte";
// @ts-ignore
import Journal from "./components/Journal.svelte";
// @ts-ignore
import Settings from "./components/Settings.svelte";
// @ts-ignore
import Timeline from "./components/Timeline.svelte";
// @ts-ignore
// import NotFound from "./components/NotFound.svelte";

export default {
  // Exact path
  // "*": NotFound,
  "/": About,
  "/memory-verse": MemoryVerse,
  "/reading-plan": ReadingPlan,
  "/journal": Journal,
  "/settings": Settings,
  "/timeline": Timeline
};
