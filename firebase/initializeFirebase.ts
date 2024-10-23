import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import dotenv from 'react-native-dotenv'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
(dotenv as any).config()

const { 
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID, 
  FIREBASE_STORAGE_BUCKET,
  FIRBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIRBASE_MEASUREMENT_ID
} = process.env

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIRBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIRBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);
