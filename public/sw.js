// WWE Universe Progressive Web App Service Worker
const CACHE_NAME = 'wwe-universe-v2.0';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/superstars/cody-rhodes.jpg',
  '/superstars/roman-reigns.jpg',
  '/superstars/rhea-ripley.jpg',
  '/superstars/gunther.jpg',
  '/superstars/seth-rollins.jpg',
  '/superstars/cm-punk.jpg',
  '/superstars/the-rock.jpg',
  '/superstars/john-cena.jpg',
  '/shows/raw.jpg',
  '/shows/smackdown.jpg',
  '/shows/nxt.jpg',
  '/events/wrestlemania.jpg',
  '/events/royal-rumble.jpg',
  '/events/summerslam.jpg',
  '/events/survivor-series.jpg'
];

// Install Event: Pre-cache core shell & images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[WWE PWA SW] Pre-caching core shell');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[WWE PWA SW] Pre-cache partial warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleanup stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Cache-First for static assets, Stale-While-Revalidate for pages
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Ignore non-http or cross-origin POST requests
  if (event.request.method !== 'GET' || !requestUrl.protocol.startsWith('http')) {
    return;
  }

  // Handle SPA routing & static requests
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to revalidate cache
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {/* Offline fallback */});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // If navigation request fails and offline, return cached index.html
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
