const OFFLINE_VERSION = 1;
const OFFLINE_URL = '/index.html';
const CACHE_NAME = 'app-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/css/main.20b84032.css',
    '/static/css/main.20b84032.css.map',
    '/static/js/787.b7604a91.chunk.js',
    '/static/js/787.b7604a91.chunk.js.map',
    '/static/js/main.bd890eb7.js',
    '/static/js/main.bd890eb7.js.map',
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
        await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
        await cache.addAll(urlsToCache)
    })());
});


self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });
