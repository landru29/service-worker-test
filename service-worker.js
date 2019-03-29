var cacheName = 'v7';
var cacheFiles = [
    './',
    './index.html',
    './css/reset.css',
    './css/style.css',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic',
    './js/app.js'
];

self.addEventListener('install', function(e) {
    console.log('[Service worker]', 'installed', e);
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service worker]', 'caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[Service worker]', 'activated', e);

    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log('[Service worker]', 'removing cached files from', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[Service worker]', 'fetching', e.request.url);

    e.respondWith(
        caches.match(e.request)
            .then(function(response) {
                if (response) {
                    console.log('[Service worker]', 'found in cache', e.request.url);
                    return response;
                }

                var requestClone = e.request.clone();

                return fetch(requestClone)
                    .then(function(response) {
                        if (!response) {
                            console.log('[Service worker]', 'No response from cache');
                            return response;
                        }

                        var responseClone = response.clone();

                        caches.open(cacheName).then(function (cache) {
                            cache.put(e.request, responseClone);
                            return response;
                        });

                    })
                    .catch(function(err) {
                        console.log('[Service worker]', 'Error fetching and caching', err);
                    })
            })
    );
});

