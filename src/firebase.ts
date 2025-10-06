// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAPno0oOsuActjpgd_zVXZDAxMDWnOMcgk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sample-firebase-ai-app-5a13c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sample-firebase-ai-app-5a13c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sample-firebase-ai-app-5a13c.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "743601729048",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:743601729048:web:ae3ad1166541d1a9bd1d6d"
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

// Initialize Firebase with enhanced error handling
let app;
try {
  console.log('Starting Firebase initialization...');
  
  // Double check config values
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    console.error('Firebase config values:', {
      apiKey: firebaseConfig.apiKey ? 'PRESENT' : 'MISSING',
      authDomain: firebaseConfig.authDomain ? 'PRESENT' : 'MISSING',
      projectId: firebaseConfig.projectId ? 'PRESENT' : 'MISSING'
    });
    throw new Error('Required Firebase configuration values are missing');
  }

  try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase core initialized successfully');
  } catch (error: any) {
    if (error.code === 'app/duplicate-app') {
      console.log('Firebase already initialized, getting existing app');
      app = initializeApp(firebaseConfig, 'default');
    } else {
      console.error('Firebase initialization error:', error);
      throw error;
    }
  }
} catch (error) {
  console.error('Critical error during Firebase initialization:', error);
  throw error;
}

// Initialize services with enhanced error handling
let auth, db;
try {
  console.log('Initializing Firebase services...');
  auth = getAuth(app);
  console.log('Auth service initialized');
  db = getFirestore(app);
  console.log('Firestore service initialized');
} catch (error) {
  console.error('Error initializing Firebase services:', error);
  throw error;
}

// Initialize Google provider with error handling
let googleProvider;
try {
  googleProvider = new GoogleAuthProvider();
  console.log('Google auth provider initialized');
} catch (error) {
  console.error('Error initializing Google auth provider:', error);
  throw error;
}

export { auth, db, googleProvider };
