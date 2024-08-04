import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-AWT7nzJDn3MZo0atH9fO3QuZ45Brc-Y",
  authDomain: "pantryapp-4f865.firebaseapp.com",
  projectId: "pantryapp-4f865",
  storageBucket: "pantryapp-4f865.appspot.com",
  messagingSenderId: "288810193189",
  appId: "1:288810193189:web:db53e6f82be784faf38acc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app, firebaseConfig}

const firestore = getFirestore(app);
export {firestore};