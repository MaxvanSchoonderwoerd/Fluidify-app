import { urlBase64ToUint8Array } from "./utils/urlBase64ToUint8Array";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      // Request permission for notifications
      return Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          subscribeUserToPush(registration);
        }
      });
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });

  function subscribeUserToPush(registration) {
    // Fetch the public key from the server
    fetch("/vapidPublicKey")
      .then((response) => response.text())
      .then((vapidPublicKey) => {
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
      })
      .then((subscription) => {
        console.log("User is subscribed:", subscription);

        // Send the subscription details to the server
        fetch("/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .catch((error) => {
        console.error("Failed to subscribe the user: ", error);
      });
  }
}
