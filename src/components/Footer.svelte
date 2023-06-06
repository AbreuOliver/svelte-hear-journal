<script>
  import Router, { location } from "svelte-spa-router";
</script>

<footer
  class="fixed bottom-0 left-0 z-50 w-full h-20 bg-white dark:bg-gray-700 dark:border-gray-600 text-xs md:h-[5.5rem]"
>
  <div class="grid h-full max-w-[770px] grid-cols-4 mx-auto">
    {#if $location === "/memory-verse"}
      <a
        href="#/memory-verse"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group bg-gray-200 dark:bg-gray-800"
      >
        <svg
          class="w-6 h-6 mb-1 text-blue-600 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
        <span
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group bg-gray-200 dark:bg-gray-800 text-blue-600"
        >
          Memorize
        </span>
      </a>
    {:else}
      <a
        href="#/memory-verse"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
      >
        <svg
          class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
        <span
          class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
        >
          Memorize
        </span>
      </a>
    {/if}
    <!-- READING PLAN -->
    {#if $location === "/reading-plan"}
      <a
        href="#/reading-plan"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group bg-gray-200 dark:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 mb-1 text-blue-600 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span
          class="text-xs text-blue-600 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
        >
          Read
        </span>
      </a>
    {:else}
      <a
        href="#/reading-plan"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span
          class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
        >
          Read
        </span>
      </a>
    {/if}
    <!-- JOURNAL -->
    {#if $location === "/journal"}
      <a
        href="#/journal"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group bg-gray-200 dark:bg-gray-800"
      >
        <svg
          class="w-6 h-6 mb-1 text-blue-600 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span
          class="text-xs text-blue-600 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
        >
          Journal
        </span>
      </a>
    {:else}
      <a
        href="#/journal"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
      >
        <svg
          class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span
          class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
        >
          Journal
        </span>
      </a>
    {/if}

    {#if $location === "/timeline"}
      <a
        href="#/timeline"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group bg-gray-200 dark:bg-gray-800"
      >
        <svg
          class="w-6 h-6 mb-1 text-blue-600 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
          />
        </svg>
        <span
          class="text-xs text-blue-600 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
        >
          Timeline
        </span>
      </a>
    {:else}
      <a
        href="#/timeline"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
      >
        <svg
          class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
          />
        </svg>
        <span
          class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 md:text-lg"
        >
          Timeline
        </span>
      </a>
    {/if}
  </div>
</footer>
