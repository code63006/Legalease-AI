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

// Validate Firebase config
if (!firebaseConfig.apiKey) {
  throw new Error('Firebase API key is missing');
}

// Initialize Firebase with error handling
let app;
try {
  // Check if Firebase is already initialized
  try {
    app = initializeApp(firebaseConfig);
  } catch (error: any) {
    if (error.code === 'app/duplicate-app') {
      console.log('Firebase already initialized, getting existing app');
      app = initializeApp(firebaseConfig, 'default');
    } else {
      throw error;
    }
  }
  console.log('Firebase initialized successfully with config:', {
    ...firebaseConfig,
    apiKey: '***' // Hide API key in logs
  });
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
