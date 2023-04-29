import Home from "./components/Home.svelte";
import Article from "./components/Article.svelte";
import About from "./components/About.svelte";
import NotFound from "./components/NotFound.svelte";
import ReadingPlan from "./components/ReadingPlan.svelte";

export const routes = {
  "/reading-plan": ReadingPlan,
  // Exact path
  "/": Home,
  "/about": About,
  // Exact path + parameter
  "/article/:title": Article,
  // Wildcard
  "*": NotFound
};