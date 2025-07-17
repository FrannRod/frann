self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
  const { title, options } = event.data;
  if (title) {
    self.registration.showNotification(title, options);
  }
});
