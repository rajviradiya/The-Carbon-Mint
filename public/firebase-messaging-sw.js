importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyA1GK4vFLHveV4O3PohtnWKD5ZRVMK8314",
    authDomain: "the-carbon-mint.firebaseapp.com",
    projectId: "the-carbon-mint",
    storageBucket: "the-carbon-mint.appspot.com",
    messagingSenderId: "606288481801",
    appId: "1:606288481801:web:8a0c26b139b58571fcb2d8",
    measurementId: "G-MRZWFSMZX1",
    databaseUrl: "https://the-carbon-mint-default-rtdb.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
