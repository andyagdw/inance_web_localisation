import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDING_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Only initialise if *all* config values are provided in env file
let firestore;
if (Object.values(firebaseConfig).every(Boolean)) {
  const app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
} else {
  console.warn(
    "Firebase not initialised: missing env vars. " +
    `Received config: ${JSON.stringify(firebaseConfig)}`
  );
}

export { firestore };