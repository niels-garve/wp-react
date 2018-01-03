// TODO rename CACHE!
var CACHE = 'com.nielsgarve.wp-react.wp-json-cache';
var FALLBACK = '{"code":"rest_post_invalid_id","message":"Invalid post ID.","data":{"status":404}}';

/**
 * @see https://github.com/NekR/offline-plugin/issues/64#issuecomment-223949743
 * @see https://jakearchibald.com/2014/offline-cookbook/
 */
self.addEventListener('fetch', function (event) {
  if (event.request.url.indexOf('/wp-json') !== -1) {
    event.respondWith(
      fetch(event.request).then(function (response) {
        return caches.open(CACHE).then(function (cache) {
          return cache.put(event.request, response.clone()).then(function () {
            return response;
          })
        }).catch(function () {
          return response;
        });
      }).catch(function () {
        return caches.match(event.request);
      }).catch(function () { // fallback
        return Promise.resolve(new Response(FALLBACK, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }));
      })
    );
  }
});
