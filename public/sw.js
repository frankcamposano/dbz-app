const CACHE_NAME = 'dbz-warriors-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/audios/gohan.mp3',
  '/audios/goku.mp3',
  '/audios/ki.mp3',
  '/audios/krillin.mp3',
  '/audios/napa.mp3',
  '/audios/picollo.mp3',
  '/audios/ten.mp3',
  '/audios/vegeta.mp3'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})))
          .catch(error => {
            console.error('Error al cachear recursos:', error);
          });
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devolver desde cache si existe
        if (response) {
          return response;
        }
        // Si no está en cache, intentar fetch
        return fetch(event.request)
          .catch(error => {
            console.error('Error al hacer fetch:', error);
            // Si el fetch falla, podríamos devolver una respuesta fallback aquí
            return new Response('Error al cargar el recurso', {
              status: 404,
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
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
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});