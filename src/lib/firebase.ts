import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7Y2leEchn6zY6HixyJNa1yP2y_HDMwvg",
  authDomain: "powerpay-inventory.firebaseapp.com",
  databaseURL: "https://powerpay-inventory-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "powerpay-inventory",
  storageBucket: "powerpay-inventory.firebasestorage.app",
  messagingSenderId: "456068932362",
  appId: "1:456068932362:web:2a321464888b02046910f3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);