(function () {
    if (!("serviceWorker" in navigator)) {
      throw new Error("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
      throw new Error("No Push API Support!");
    }
  })();
  

Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function displayNotification() {
    if (!("Notification" in window)) {
        console.warn("This browser does not support notifications");
        return;
    }
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            const options = {
                body: 'Here is a notification body!',
                icon: 'images/homme.png',
                requireInteraction: false,
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                }
            };

            const notif = new Notification('Hello world!', options);

            //notif.
        });
    }
  }

function subscribe() {
    /*if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(reg) {
          console.log('Service Worker Registered!', reg);
      
          reg.pushManager.getSubscription().then(function(sub) {
            if (sub === null) {
              // Update UI to ask user to register for Push
              console.log('Not subscribed to push service!');
            } else {
              // We have a subscription, update the database
              console.log('Subscription object: ', sub);
            }
          });
        })
         .catch(function(err) {
          console.log('Service Worker registration failed: ', err);
        });
    }*/
}