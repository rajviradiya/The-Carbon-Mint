import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import {getDatabase} from "firebase/database"
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1GK4vFLHveV4O3PohtnWKD5ZRVMK8314",
  authDomain: "the-carbon-mint.firebaseapp.com",
  databaseURL: "https://the-carbon-mint-default-rtdb.firebaseio.com",
  projectId: "the-carbon-mint",
  storageBucket: "the-carbon-mint.appspot.com",
  messagingSenderId: "606288481801",
  appId: "1:606288481801:web:8a0c26b139b58571fcb2d8",
  measurementId: "G-MRZWFSMZX1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const storageref = ref(storage,"uploads/")
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);
const realDatabase = getDatabase(app);
const messaging = getMessaging(app)

export {storage,storageref, auth, googleProvider, realDatabase, messaging};
