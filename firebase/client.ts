// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl6t4rV-nYB8V2ssWBAyNeGlavynatL5A",
  authDomain: "voteraware-6a446.firebaseapp.com",
  databaseURL: "https://voteraware-6a446-default-rtdb.firebaseio.com",
  projectId: "voteraware-6a446",
  storageBucket: "voteraware-6a446.firebasestorage.app",
  messagingSenderId: "235326684372",
  appId: "1:235326684372:web:4451572541c2de43380f41",
  measurementId: "G-BX482TZQCF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);