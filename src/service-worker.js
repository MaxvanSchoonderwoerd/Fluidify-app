/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

const API_URL = "https://cmgt.hr.nl/api/projects";
const CACHE_NAME = "fluidify-pwa-cache";
const DB_NAME = "fluidify-pwa-indexedDB";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      try {
        cache.addAll(["/", "/index.html", "static/js/bundle.js"]);
        return self.skipWaiting();
      } catch (error) {
        console.error(error);
      }
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(API_URL)) {
    // Intercept fetch requests to the external API
    event.respondWith(handleApiRequest(event.request));
  } else {
    // Handle other fetch requests (e.g., static assets)
    event.respondWith(handleStaticAssets(event.request));
  }
});

// Handle fetch requests for static assets (e.g., HTML, JS, CSS) CACHE FIRST NETWORK SECOND
const handleStaticAssets = async (request) => {
  return caches.match(request).then((cachedResponse) => {
    // Check if the resource is in the cache
    if (cachedResponse) return cachedResponse;

    // If not in the cache or user is online, fetch the resource from the network
    return fetch(request).then((response) => {
      // Check if the fetch was successful
      if (!response || response.status !== 200) return response;

      // Clone the response to use in both the cache and the client
      const responseToCache = response.clone();

      // Open the cache and put the response into it
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    });
  });
};

// Handle fetch requests for api calls NETWORK FIRST CACHE SECOND
const handleApiRequest = async (request) => {
  if (navigator.onLine) {
    //online

    //clone the request
    let clonedRequest = request.clone();

    //fetch the request
    return fetch(clonedRequest).then((response) => {
      if (!response || response.status !== 200) return response;

      //if valid response
      //clone the response
      let clonedResponse = response.clone();

      //store response in to IndexedDB
      storeResponseInIndexedDB(clonedResponse);

      return response;
    });
  } else {
    return getAllDataFromIndexedDB();
  }
};

const storeResponseInIndexedDB = async (response) => {
  const dbRequest = indexedDB.open(DB_NAME, 1);
  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create an objectStore to hold information about our projects. We're
    // going to use "id" as our key path because it's guaranteed to be unique.
    const objectStore = db.createObjectStore("projects", { keyPath: "id", autoIncrement: true });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = async (event) => {
      try {
        // Log the API response body
        const responseBody = await response.json();
        // Store values in the newly created objectStore.
        const projectObjectStore = db.transaction("projects", "readwrite").objectStore("projects");
        responseBody.data.forEach((project) => {
          projectObjectStore.add(project);
        });
      } catch (error) {
        console.error(error);
      }
    };
  };
};

const getAllDataFromIndexedDB = async () => {
  return new Promise(async (resolve, reject) => {
    const db = indexedDB.open(DB_NAME, 1);

    db.onsuccess = (event) => {
      const database = event.target.result;
      const transaction = database.transaction(["projects"], "readonly");
      const objectStore = transaction.objectStore("projects");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = (event) => {
        const data = new Response(JSON.stringify({ data: event.target.result }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
        resolve(data);
      };

      getAllRequest.onerror = (event) => {
        reject(new Error(`Error getting data from IndexedDB: ${event.target.error}`));
      };
    };

    db.onerror = (event) => {
      reject(new Error(`Error opening IndexedDB: ${event.target.error}`));
    };
  });
};

// Listen for push events
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new message.",
    icon: data.icon || "/icons/icon-192x192.png",
    badge: data.badge || "/icons/icon-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Listen for notification click events
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow("/");
    })
  );
});
