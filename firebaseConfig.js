// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7Y2leEchn6zY6HixyJNa1yP2y_HDMwvg",
  authDomain: "powerpay-inventory.firebaseapp.com",
  databaseURL: "https://powerpay-inventory-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "powerpay-inventory",
  storageBucket: "powerpay-inventory.firebasestorage.app",
  messagingSenderId: "456068932362",
  appId: "1:456068932362:web:2a321464888b02046910f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);