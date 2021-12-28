// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

importScripts("https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js");


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBoeRW_MhDwEOuu_3UxQIIJ6FF_JfAAfD4",
  authDomain: "zero-norn.firebaseapp.com",
  projectId: "zero-norn",
  storageBucket: "zero-norn.appspot.com",
  messagingSenderId: "397330300244",
  appId: "1:397330300244:web:0f5af72452fae1b6149cc1",
  measurementId: "G-XQ6TB8MVK1"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// include your worker

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  //store on indexDB
  localforage.setItem('newNoti', true)

  /*
  //when the app is open but the user not focus in these tab
  self.clients.matchAll({ includeUncontrolled: true }).then(function (clients) {
    console.log(clients);
    //you can see your main window client in this list.
    clients.forEach(function (client) {
      client.postMessage('new_notification');
    })

  })
  */
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});


