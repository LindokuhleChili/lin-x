import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Public web config. Env vars override these so Amplify can inject them,
// and the defaults keep a build working when the console has none set.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDqUS4ucClIxjJ2pgDmu8_OA5tW4KYXFyg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lin-x-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lin-x-portfolio",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lin-x-portfolio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1011430016148",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1011430016148:web:9f808331773e0234162081"
};

let db;

export function getDb() {
  if (db) return db;
  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
  return db;
}
