const CACHE_NAME = 'camping-planner-v2';
const urlsToCache = [
  '/camping-planner/',
  '/camping-planner/index.html',
  '/camping-planner/shopping_list.html',
  '/camping-planner/equipment_checklist.html',
  '/camping-planner/meal_plan.html',
  '/camping-planner/route_and_timing.html',
  '/camping-planner/weather_and_safety.html',
  '/camping-planner/manifest.json'
];

// Install event - cache all the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
