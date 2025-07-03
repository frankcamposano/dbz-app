const CACHE_NAME = 'dbz-app-v1';
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
];

const IMAGE_CACHE_NAME = 'dbz-app-images-v1';
const AUDIO_CACHE_NAME = 'dbz-app-audio-v1';

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_RESOURCES)),
      caches.open(IMAGE_CACHE_NAME),
      caches.open(AUDIO_CACHE_NAME)
    ])
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Manejar imágenes
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // Manejar archivos de audio
  if (event.request.url.includes('/audios/')) {
    event.respondWith(
      caches.open(AUDIO_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // Manejar otros recursos
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (STATIC_RESOURCES.includes(url.pathname)) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});

// Actualizar Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME, IMAGE_CACHE_NAME, AUDIO_CACHE_NAME].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});