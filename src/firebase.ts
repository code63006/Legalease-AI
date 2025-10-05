// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFZ2ArM_6HI8ynFr4tduOtOtGxhZWiz7Y",
  authDomain: "legalease-ai-auth.firebaseapp.com",
  projectId: "legalease-ai-auth",
  storageBucket: "legalease-ai-auth.appspot.com",
  messagingSenderId: "451325696432",
  appId: "1:451325696432:web:2f936a9d371b8d44a67f13"
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Initialize services with error handling
let auth, db;
try {
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('Firebase services initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase services:', error);
  throw error;
}

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
