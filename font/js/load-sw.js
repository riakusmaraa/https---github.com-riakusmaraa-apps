// importScripts('http://em.ub.ac.id/apps/js/notif.js');
let newWorker;
function showUpdateBar() {
  let snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
}

document.getElementById("reload").addEventListener("click", function() {
  newWorker.postMessage({ action: "skipWaiting" });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-workers.js").then(reg => {
    requestPermission();
    // showNotifikasiIkon();
    reg.addEventListener("updatefound", () => {
      newWorker = reg.installing;
      newWorker.addEventListener("statechange", () => {
        switch (newWorker.state) {
          case "installed":
            if (navigator.serviceWorker.controller) {
              showUpdateBar();
            }
            break;
        }
      });
    });
  });
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", function() {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}

function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function(result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          reg.pushManager
            .subscribe({
              userVisibleOnly: true
            })
            .then(function(sub) {
              console.log(
                "Berhasil melakukan subscribe dengan endpoint: ",
                sub.endpoint
              );
              console.log(
                "Berhasil melakukan subscribe dengan p256dh key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(sub.getKey("p256dh"))
                  )
                )
              );
              console.log(
                "Berhasil melakukan subscribe dengan auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(sub.getKey("auth"))
                  )
                )
              );
            })
            .catch(function(e) {
              console.error("Tidak dapat melakukan subscribe ", e);
            });
        });
      }
    });
  }
}

function showNotifikasiIkon() {
  const title = "EM Notification";
  body = "Halo, Yuk Kenali Kabinet BARA WIJAYA !!!";
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
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("Fitur notifikasi tidak diijinkan.");
  }
}
