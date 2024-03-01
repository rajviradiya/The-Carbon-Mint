import { initializeApp } from "firebase/app";
import {Database} from "firebase/database"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA1GK4vFLHveV4O3PohtnWKD5ZRVMK8314",
  authDomain: "the-carbon-mint.firebaseapp.com",
  projectId: "the-carbon-mint",
  storageBucket: "the-carbon-mint.appspot.com",
  messagingSenderId: "606288481801",
  appId: "1:606288481801:web:8a0c26b139b58571fcb2d8",
  measurementId: "G-MRZWFSMZX1"
};

const app = initializeApp(firebaseConfig);
export const database = database(app)
export const auth = getAuth(app) 