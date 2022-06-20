"use strict";
/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
const number = "0.2.9";
const version = `emapps-${number}`;

let offlineFundamentals = [
  "/css/animations.scss",
  "/css/emstyle.css",
  "/css/emlogin.css",
  "/css/bootstrap.min.css",
  "/css/emsresponsive.css",
  "/css/owl.carousel.min.css",
  "/css/owl.theme.default.min.css",
  "/css/pendataan.css",
  "/css/slider.scss",
  "/css/sweetalert2.min.css",
  "/img/icon/aboutus.svg",
  "/img/icon/care.svg",
  "/img/icon/employee.svg",
  "/img/icon/event.svg",
  "/img/icon/graduation-cap.svg",
  "/img/icon/information-circular-button-symbol.svg",
  "/img/icon/linkno.svg",
  "/img/icon/medal.svg",
  "/img/icon/plan.svg",
  "/img/icon/premium.svg",
  "/img/icon/trophy.svg",
  "/img/icon/user.svg",
  "/img/icon/voice-command.svg",
  "/img/icon/vote.svg",
  "/img/ajax-loader.gif",
  "/img/logo.png",
  "/img/logo2.png",
  "/img/logobg.png",
  "/img/logo2.webp",
  "/img/owl.video.play.png",
  "/img/scholar.png",
  "/img/slide1.jpg",
  "/img/slide2.jpg",
  "/img/slide1.webp",
  "/img/slide2.webp",
  "/js/emapps.js",
  "/js/emlink.js",
  "/js/emlogin.js",
  "/js/emauth.js",
  "/js/idb.js",
  "/js/jquery.min.js",
  "/js/load-sw.js",
  "/js/modal.js",
  "/js/ow.carousel.min.js",
  "/js/sweetalert2.all.min.js",
  "/about.html",
  "/index.html",
  "/emlink.html",
  "/login.html",
  "/onGoing.html",
  "/profile.html"
];
self.addEventListener("beforeinstallprompt", function(e) {
  e.userChoice.then(function(choiceResult) {
    console.log(choiceResult.outcome);

    if (choiceResult.outcome == "dismissed") {
      console.log("User cancelled home screen install");
    } else {
      console.log("User added to home screen");
    }
  });
});

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open(version)
      .then(function(cache) {
        return cache.addAll(offlineFundamentals);
      })
      .then(function() {
        return self.skipWaiting();
      })
      .catch(err => console.log("Error while fetching assets", err))
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      let networked = fetch(event.request)
        .then(fetchedFromNetwork, unableToResolve)
        .catch(unableToResolve);

      return cached || networked;

      function fetchedFromNetwork(response) {
        let cacheCopy = response.clone();
        caches
          .open(version + "pages")
          .then(function add(cache) {
            cache.put(event.request, cacheCopy);
          })
          .then(function() {
            // console.log(
            //   "WORKER: fetch response stored in cache.",
            //   event.request.url
            // );
          });
        return response;
      }

      function unableToResolve() {
        return new Response("<h1>Service Unavailable</h1>", {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/html"
          })
        });
      }
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function(keys) {
        return Promise.all(
          keys
            .filter(function(key) {
              return !key.startsWith(version);
            })
            .map(function(key) {
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.log("WORKER: activate completed.");
      })
  );
});

self.addEventListener("push", function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  const title = "EM APPS Notification";
  var options = {
    body: body,
    icon: "img/logo.png",
    requireInteraction: true,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: "yes-action",
        title: "Ya"
      },
      {
        action: "no-action",
        title: "Tidak"
      }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  if (!event.action) {
    console.log("Notification Click.");
    return;
  }
  switch (event.action) {
    case "yes-action":
      console.log("Pengguna memilih action yes.");
      clients.openWindow("https://em.ub.ac.id/biro-puskominfo/");
      break;
    case "no-action":
      console.log("Pengguna memilih action no");
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});
