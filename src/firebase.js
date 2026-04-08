import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqkvE8qkh2IBmckQGleWmtcUCGMw5e8Ys",
  authDomain: "smart-order-managment.firebaseapp.com",
  projectId: "smart-order-managment",
  storageBucket: "smart-order-managment.firebasestorage.app",
  messagingSenderId: "694899265631",
  appId: "1:694899265631:web:064b1c2a5d9f2b0c40cbea",
  measurementId: "G-JFYMP6WG49"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { app, analytics, db };