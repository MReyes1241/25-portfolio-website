// this handles incoming push events and notification clicks

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "📖 Manga Update", body: event.data.text() };
  }

  const { title, body, icon, badge, data } = payload;

  event.waitUntil(
    self.registration.showNotification(title ?? "📖 Manga Update", {
      body,
      icon: icon ?? "/favicon.ico",
      badge: badge ?? "/favicon.ico",
      data,
      vibrate: [200, 100, 200],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "https://reyesjr.com/admin/manga";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Focus existing tab if open
      for (const client of clientList) {
        if (client.url === url && "focus" in client) return client.focus();
      }
      // Otherwise open new tab
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});