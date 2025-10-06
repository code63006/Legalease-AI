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
  console.log("Starting Firebase initialization with config:", {
    ...firebaseConfig,
    apiKey: "HIDDEN"
  });
  
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized");
  
  auth = getAuth(app);
  console.log("Firebase auth initialized");
  
  db = getFirestore(app);
  console.log("Firestore initialized");
  
  googleProvider = new GoogleAuthProvider();
  console.log("Google auth provider initialized");
  
  console.log("All Firebase services initialized successfully!");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { auth, db, googleProvider };
