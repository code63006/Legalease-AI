// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
