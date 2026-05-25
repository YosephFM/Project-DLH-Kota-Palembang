import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBl_NPfSlCyRZ2ksJkjv8zDXYXr0vt5LzY",
  authDomain: "absensi-dlh-8ef17.firebaseapp.com",
  projectId: "absensi-dlh-8ef17",
  storageBucket: "absensi-dlh-8ef17.firebasestorage.app",
  messagingSenderId: "660183685783",
  appId: "1:660183685783:web:46cdeb2ffaf9761f2127d2",
  measurementId: "G-HC9QE64Z75"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const db = getFirestore(app);

export default app;