// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPno0oOsuActjpgd_zVXZDAxMDWnOMcgk",
  authDomain: "sample-firebase-ai-app-5a13c.firebaseapp.com",
  projectId: "sample-firebase-ai-app-5a13c",
  storageBucket: "sample-firebase-ai-app-5a13c.appspot.com",
  messagingSenderId: "743601729048",
  appId: "1:743601729048:web:ae3ad1166541d1a9bd1d6d"
};

let app;
let auth;
let db;
let googleProvider;

try {
  console.log("Initializing Firebase...");
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  console.log("Firebase initialized successfully!");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { auth, db, googleProvider };
