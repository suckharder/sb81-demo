// Original source: https://dev.to/prorishi/your-static-site-to-a-pwa-24dl

// Name of the Cache.
const CACHE = "PWA_Cache";

// Select files for caching.
let urlsToCache = [
    "/sb81-demo/",
    "/sb81-demo/index.html",
    "/sb81-demo/favicon.ico", 
    "/sb81-demo/logo.png",
    "/sb81-demo/background.jpg",
    "/sb81-demo/css/main.static.css"
];

// Cache all the selected items once application is installed.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            console.log("Caching started.");
            return cache.addAll(urlsToCache);
        })
    );
});

// Whenever a resource is requested, return if its cached else fetch the resource from server.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
