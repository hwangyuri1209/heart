import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDQcRQh_T_tMEyS4XrowtIDVwVIm9U65TE",
  authDomain: "heart-6895b.firebaseapp.com",
  projectId: "heart-6895b",
  storageBucket: "heart-6895b.firebasestorage.app",
  messagingSenderId: "516952712462",
  appId: "1:516952712462:web:9f06bf360b8a0c9c3a235f"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
