// DuukaList+ Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDDrs2htCLBBEWZ1h76hfopAKjw9KknFFg',
  authDomain: 'duukalist-2f1f9.firebaseapp.com',
  projectId: 'duukalist-2f1f9',
  storageBucket: 'duukalist-2f1f9.firebasestorage.app',
  messagingSenderId: '783365102606',
  appId: '1:783365102606:web:b3058da8ec16326495b05f',
  measurementId: 'G-2FGDC887SK',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  const data = payload.data || {};
  self.registration.showNotification(title || 'DuukaList+', {
    body: body || 'You have a new notification',
    icon: icon || '/icon-192.png',
    badge: '/icon-72.png',
    data,
    tag: data.tag || 'duukalist-notif',
    renotify: true,
    actions: [{ action: 'open', title: 'Open' }],
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  const url = data.url || 'https://keromisec9-prog.github.io/DuukaList/' + (data.path || '#/messages');
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('keromisec9-prog.github.io') && 'focus' in client) {
          client.postMessage({ type: 'NAVIGATE', url });
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
