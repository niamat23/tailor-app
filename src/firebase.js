import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd7njKyV1E8SH6nmOQM9ka5F48Qe-CQBY",
  authDomain: "tailor-app-9f7a7.firebaseapp.com",
  projectId: "tailor-app-9f7a7",
  storageBucket: "tailor-app-9f7a7.firebasestorage.app",
  messagingSenderId: "681290180430",
  appId: "1:681290180430:web:e784672367e6238de8601f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);