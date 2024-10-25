import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.PUBLIC_API_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_API_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_API_FIRBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_API_FIREBASE_APP_ID,
  measurementId: process.env.PUBLIC_API_FIRBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
