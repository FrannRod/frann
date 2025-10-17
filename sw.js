self.addEventListener('install', (evento) => {
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientes) => {
      for (const cliente of clientes) {
        if (cliente.url && cliente.url.includes('alarmas.html')) {
          return cliente.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('alarmas.html');
      }
      return null;
    })
  );
});
