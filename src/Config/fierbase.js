import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database"

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

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);
const realDatabase = getDatabase(app);

export { auth, googleProvider, realDatabase };
