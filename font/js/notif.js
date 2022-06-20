function showNotifikasiIkon() {
    const title = 'EM Notification';
    body='HALO INI EM APPS';
    var options = {
        body: body,
        icon: 'img/logo.png',
        requireInteraction: true,
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {
            action: 'yes-action',
            title: 'Ya',
          },
          {
            action: 'no-action',
            title: 'Tidak',
          }
        ]
      };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}