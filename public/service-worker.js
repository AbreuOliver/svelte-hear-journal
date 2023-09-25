"use strict";

// Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v1";

// Add list of files to cache here.
const FILES_TO_CACHE = [
  "../public/offline.html",
  "../src/components/About.svelte",
  "../src/components/Copy.svelte",
  "../src/components/Navbar.svelte",
  "../src/components/About.svelte",
  "../src/components/About.svelte",
  "../src/components/PageHeading.svelte",
  "../src/components/MemoryVerses.svelte",
  "../src/components/ReadingPlan.svelte",
  "../src/components/Settings.svelte",
  "../src/components/Footer.svelte",
  "../src/components/Timeline.svelte",
  "../src/components/store"
];

self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page and Svelte store file", FILES_TO_CACHE);
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }

  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.match(evt.request).then((response) => {
        if (response) {
          console.log("[ServiceWorker] Serving response from cache:", response);
          // Log specific values from the response
          console.log("[ServiceWorker] Cached values:", response.yourValue);
          return response;
        }

        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match(evt.request).then((response) => {
            if (response) {
              console.log("[ServiceWorker] Serving response from cache:", response);
              // Log specific values from the response
              console.log("[ServiceWorker] Cached values:", response.yourValue);
              return response;
            }

            return cache.match("offline.html");
          });
        });
      });
    })
  );
});
