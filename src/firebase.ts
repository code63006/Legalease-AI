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
  storageBucket: "sample-firebase-ai-app-5a13c.firebasestorage.app",
  messagingSenderId: "743601729048",
  appId: "1:743601729048:web:ae3ad1166541d1a9bd1d6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
