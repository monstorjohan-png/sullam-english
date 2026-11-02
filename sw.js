/* سلّم — Service Worker
   استراتيجية: الأصول المحلية تُخزَّن مسبقاً، والطلب يذهب للكاش أولاً ثم الشبكة.
   الخطوط الخارجية تُترك للشبكة (لا تُخزَّن) حتى لا يتعطل الموقع بلا إنترنت. */

var CACHE = "sullam-v1";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/css/styles.css",
  "./assets/js/data.js",
  "./assets/js/app.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(function (cache) {
        return cache.addAll(ASSETS);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (k) {
              return k !== CACHE;
            })
            .map(function (k) {
              return caches.delete(k);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) {
        // تحديث صامت في الخلفية
        fetch(req)
          .then(function (res) {
            if (res && res.ok) {
              caches.open(CACHE).then(function (c) {
                c.put(req, res.clone());
              });
            }
          })
          .catch(function () {});
        return hit;
      }
      return fetch(req)
        .then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) {
              c.put(req, copy);
            });
          }
          return res;
        })
        .catch(function () {
          return caches.match("./index.html");
        });
    })
  );
});
