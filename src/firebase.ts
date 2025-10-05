// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Debug: Log Firebase config values (mask apiKey)
console.log("Firebase config loaded:", {
  apiKey: firebaseConfig.apiKey ? "****" : "(empty)",
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId
});

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
