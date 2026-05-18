// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV8X3eva8BN7F1Dt-r_QStlwFxpLyQXN8",
  authDomain: "weather-station-f59f0.firebaseapp.com",
  databaseURL: "https://weather-station-f59f0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weather-station-f59f0",
  storageBucket: "weather-station-f59f0.firebasestorage.app",
  messagingSenderId: "724168425572",
  appId: "1:724168425572:web:ab416b6e50d6f4adba5f71",
  measurementId: "G-QVYW9ELCVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);