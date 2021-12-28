// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoeRW_MhDwEOuu_3UxQIIJ6FF_JfAAfD4",
  authDomain: "zero-norn.firebaseapp.com",
  projectId: "zero-norn",
  storageBucket: "zero-norn.appspot.com",
  messagingSenderId: "397330300244",
  appId: "1:397330300244:web:0f5af72452fae1b6149cc1",
  measurementId: "G-XQ6TB8MVK1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });