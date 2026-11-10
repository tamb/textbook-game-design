const CACHE_NAME = "game-design-textbook-v1";

const PRECACHE_ASSETS = [
  "./",
  "./introduction/",
  "./tools/",
  "./glossary/",
  "./progress/",
  "./learn/feel/",
  "./learn/frames/",
  "./learn/forgiveness/",
  "./learn/combat/",
  "./learn/physics/",
  "./learn/structure/",
  "./learn/teaching/",
  "./learn/sessions/",
  "./quiz/feel/",
  "./quiz/frames/",
  "./quiz/forgiveness/",
  "./quiz/combat/",
  "./quiz/physics/",
  "./quiz/structure/",
  "./quiz/teaching/",
  "./quiz/sessions/",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS).catch((err) => {
          console.warn("Precache error:", err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Cache-first for immutable Next.js static chunks
  if (url.pathname.includes("/_next/static/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Stale-while-revalidate for content pages and other local assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.mode === "navigate") {
            return cachedResponse || caches.match("./");
          }
          return null;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
