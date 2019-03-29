

var readyPromise;

function ready() {
    if (!readyPromise) {
        readyPromise = new Promise(function(resolve, reject) {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('./service-worker.js', { scope: '/' })
                    .then(function(registration) {
                        console.log('Service worker Registered', registration);

                        registration.addEventListener('updateFound', function() {
                            newWorker = registration.installing;

                            newWorker.addEventListener('statechange', function () {
                                switch (newWorker.state) {
                                    case 'installed':
                        
                            // There is a new service worker available, show the notification
                                        if (navigator.serviceWorker.controller) {
                                            let notification = document.getElementById('notification ');
                                            notification .className = 'show';
                                        }
                        
                                      break;
                                  }
                            });
                        });


                        resolve(registration);
                    })
                    .catch(function(err) {
                        console.log('Service worker failed', err);
                        reject(err);
                    })
            }
        });
    }
    return readyPromise;
}

ready();

function get(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var result = xhr.responseText;
                    resolve(JSON.parse(result))
                } else {
                    reject(xhr);
                }
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    })
}

ready().then(function() {
    get('https://api.nasa.gov/planetary/apod?api_key=123456')
        .then(function(response) {
            console.log('success', response);
            document.getElementsByClassName('targetImage')[0].src = response.url;
        })
        .catch(function(err) {
            console.log('ERROR', err)
        });
});
