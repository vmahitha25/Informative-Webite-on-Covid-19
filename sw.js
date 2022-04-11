if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('sw.js').then(function(registration){
            console.log('ServiceWorker Registration Successful with Scope', registration.scope);
        }, function(err){
            console.log('ServiceWorker Registration Failed:', err);
        });
    })
}

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    'index.html',
];
self.addEventListener('install', function (event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

  let deferredPrompt;
  const addBtn = document.querySelector('.add-button');
  addBtn.style.display = 'none';
  
  window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';
  
  addBtn.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  addBtn.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
  });
  

