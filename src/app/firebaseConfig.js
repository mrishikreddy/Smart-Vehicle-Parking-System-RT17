// src/app/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✅ You missed this

const firebaseConfig = {
  apiKey: "AIzaSyCesSbGK4PxJfR43X2ZQQ3PUmSeGoP_hBQ",
  authDomain: "esp-32-num-plate-recognition.firebaseapp.com",
  databaseURL: "https://esp-32-num-plate-recognition-default-rtdb.firebaseio.com", // ✅ this is correct
  projectId: "esp-32-num-plate-recognition",
  storageBucket: "esp-32-num-plate-recognition.appspot.com", // ✅ typo fixed from `.app` to `.appspot.com`
  messagingSenderId: "848101588944",
  appId: "1:848101588944:web:93a4fdd482fe3449f3c3d5",
  measurementId: "G-62T2W6H3KC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Get the Realtime Database instance
const database = getDatabase(app);

// ✅ Export it
export { database };
